"""
把自架的中文字型切成網頁用的小塊（woff2），產生 public/fonts/<代號>/ 與 public/fonts/<代號>.css。

中文字型一個字重就 4–10MB，整份掛上去老師要等很久。切法照 Google Fonts：
同一套字切成一百多塊，每塊在 CSS 裡標好包含哪些字（unicode-range），
瀏覽器只下載畫面上真的出現的那幾塊。

分塊直接沿用 Google Fonts 給 Noto Sans TC 的切法——它是照字頻排的，
常用字集中在前幾塊，一段課文通常只要抓少數幾塊。切法存在 design/noto-tc-slices.css，
要更新就重新抓：
  curl -A "Mozilla/5.0 (Macintosh) Chrome/120" \
    "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400&display=swap" > design/noto-tc-slices.css

原始字型檔太大不進版控，要重切時自己下載（來源見各字型的 SOURCES），再執行：
  python3 -m venv .fontenv && .fontenv/bin/pip install fonttools brotli
  .fontenv/bin/python scripts/build-webfonts.py <代號> <字族名> <字重> <字型檔> [<字重> <字型檔> ...]
例：
  .fontenv/bin/python scripts/build-webfonts.py gensen-rounded "GenSenRounded TW" 400 GenSenRounded2TW-R.otf 700 GenSenRounded2TW-B.otf
"""
import re
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
SLICES = ROOT / "design" / "noto-tc-slices.css"


def parse_ranges(text: str) -> list[list[tuple[int, int]]]:
    """每個 @font-face 的 unicode-range 變成 [(起, 迄), ...]。"""
    out = []
    for m in re.finditer(r"unicode-range:\s*([^;]+);", text):
        ranges = []
        for part in m.group(1).split(","):
            part = part.strip().upper().removeprefix("U+")
            a, _, b = part.partition("-")
            ranges.append((int(a, 16), int(b or a, 16)))
        out.append(ranges)
    return out


def css_range(ranges: list[tuple[int, int]]) -> str:
    return ", ".join(f"U+{a:x}" if a == b else f"U+{a:x}-{b:x}" for a, b in ranges)


def main() -> None:
    key, family, *pairs = sys.argv[1:]
    weights = list(zip(pairs[0::2], pairs[1::2]))
    slices = parse_ranges(SLICES.read_text())
    # 切法沒涵蓋到的字（字型有、Noto 的切法沒列）收進最後一塊，免得漏字
    covered = {c for rs in slices for a, b in rs for c in range(a, b + 1)}

    outdir = ROOT / "public" / "fonts" / key
    outdir.mkdir(parents=True, exist_ok=True)
    for old in outdir.glob("*.woff2"):
        old.unlink()

    faces = []
    total = 0
    for weight, path in weights:
        cmap = set(TTFont(path).getBestCmap())
        groups = [sorted(cmap & {c for a, b in rs for c in range(a, b + 1)}) for rs in slices]
        rest = sorted(cmap - covered)
        if rest:
            groups.append(rest)
        for i, cps in enumerate(groups):
            if not cps:
                continue
            name = f"{weight}-{i}.woff2"
            opts = subset.Options()
            opts.flavor = "woff2"
            opts.layout_features = ["*"]
            opts.name_IDs = ["*"]
            opts.notdef_outline = True
            font = TTFont(path)
            sub = subset.Subsetter(opts)
            sub.populate(unicodes=cps)
            sub.subset(font)
            font.flavor = "woff2"
            font.save(outdir / name)
            total += (outdir / name).stat().st_size
            # unicode-range 只寫這一塊真的有的字，連續的併成區間
            ranges, start, prev = [], cps[0], cps[0]
            for c in cps[1:]:
                if c != prev + 1:
                    ranges.append((start, prev))
                    start = c
                prev = c
            ranges.append((start, prev))
            faces.append(
                "@font-face {\n"
                f"  font-family: \"{family}\";\n"
                f"  font-weight: {weight};\n"
                "  font-style: normal;\n"
                "  font-display: swap;\n"
                f"  src: url(\"./{key}/{name}\") format(\"woff2\");\n"
                f"  unicode-range: {css_range(ranges)};\n"
                "}\n"
            )

    header = f"/* 由 scripts/build-webfonts.py 產生，請勿手動編輯。{family}：{len(faces)} 塊 */\n"
    (ROOT / "public" / "fonts" / f"{key}.css").write_text(header + "".join(faces))
    print(f"{family}: {len(faces)} 塊，共 {total / 1024 / 1024:.1f} MB → public/fonts/{key}/")


if __name__ == "__main__":
    main()
