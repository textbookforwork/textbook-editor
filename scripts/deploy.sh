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

rsync -a --delete --exclude=node_modules --exclude=dist --exclude=.git --exclude=.github \
  --exclude=.gitignore --exclude=.DS_Store "$SRC/" "$CLONE/"
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
trap 'gh auth switch -u "$PREV" >/dev/null' EXIT
git -c http.postBuffer=524288000 -c credential.helper= -c credential.helper='!gh auth git-credential' \
  push -q origin main

# GitHub Actions 建置完會在 gh-pages 留一筆「發佈網站 <sha>」
for _ in $(seq 1 60); do
  if gh api "repos/$REPO/commits?sha=gh-pages" --jq '.[0].commit.message' | grep -q "$SHA"; then
    echo "已上線：$SHA $MSG"
    exit 0
  fi
  sleep 10
done
echo "推上去了（$SHA），但十分鐘內沒看到發佈完成，去 GitHub Actions 看" >&2
exit 1
