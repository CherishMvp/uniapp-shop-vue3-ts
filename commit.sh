#! /bin/sh

git add .
read -p "input commit message: " msg
git commit -m "$msg"
# 提交之前先拉取
git pull origin poultry
git push origin poultry