#!/bin/bash
# 發佈到線上版 https://textbookforwork.github.io/textbook-editor/
# 先建置與測試，過了才把這個資料夾同步進部署用的 clone、推上 textbookforwork/textbook-editor，
# 再等 GitHub Pages 發佈完、確認線上是這一版。用法：npm run deploy -- "這次改了什麼"
set -euo pipefail

SRC="$(cd "$(dirname "$0")/.." && pwd)"
CLONE="$HOME/.cache/textbook-editor-deploy"
REPO="textbookforwork/textbook-editor"
MSG="${1:-更新編輯器}"

cd "$SRC"
npm run build >/dev/null
npm test >/dev/null

if [ ! -d "$CLONE/.git" ]; then
  mkdir -p "$(dirname "$CLONE")"
  git clone -q "https://github.com/$REPO.git" "$CLONE"
fi
cd "$CLONE"
git fetch -q origin
git reset -q --hard origin/main

# 師生同步搬來的真實出版社封面沒有用到，線上 repo 是公開的，不上傳（2026-11-11）
rsync -a --delete --exclude=node_modules --exclude=dist --exclude=.git --exclude=.github \
  --exclude=.gitignore --exclude=.DS_Store \
  --exclude='public/assets/covers/english-6.jpg' --exclude='public/assets/covers/guowen-2b.jpg' \
  --exclude='public/assets/covers/guoyu-6b.jpg' --exclude='public/assets/covers/math-2b.jpg' \
  --exclude='public/assets/covers/science-5b.jpg' --exclude='public/assets/covers/social-5b.jpg' \
  "$SRC/" "$CLONE/"
git add -A
if git diff --cached --quiet; then
  echo "線上版已經是最新，沒有東西要推"
  exit 0
fi
git commit -q -m "$MSG

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
SHA=$(git rev-parse --short HEAD)

# 線上 repo 屬於 textbookforwork 帳號；推完切回原本的帳號
PREV=$(gh api user --jq .login)
gh auth switch -u textbookforwork >/dev/null
# 切回帳號不能蓋掉腳本本身的結束碼（逾時要以 1 結束）
trap 'rc=$?; gh auth switch -u "${PREV}" >/dev/null || true; exit $rc' EXIT
git -c http.postBuffer=524288000 -c credential.helper= -c credential.helper='!gh auth git-credential' \
  push -q origin main

# GitHub Actions 建置完會在 gh-pages 留一筆「發佈網站 <sha>」
for _ in $(seq 1 60); do
  if gh api "repos/$REPO/commits?sha=gh-pages" --jq '.[0].commit.message' | grep -q "$SHA"; then
    echo "已上線：${SHA} ${MSG}"
    exit 0
  fi
  sleep 10
done
# 變數一律加大括號：bash 3.2 會把緊接在後的全形字（例：「）」）當成變數名的一部分，變成 unbound variable
echo "部署逾時：已推上 ${REPO}（${SHA}），但十分鐘內沒看到 GitHub Pages 發佈完成。" >&2
echo "請到 https://github.com/${REPO}/actions 看建置結果，失敗（例如 500）就重跑那一次。" >&2
exit 1
