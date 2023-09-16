#!/bin/bash

# 提示用户输入 commit 的内容
echo "请输入 commit 的内容："
read commit_message

# 执行 git commit 命令，并将内容替换为用户输入的内容
git commit -m "$commit_message"

# 确认是否执行 git push 操作
echo "是否执行 git push 操作？(y/n)"
read confirm_push

if [ "$confirm_push" == "y" ]; then
  git push
  echo "Git push 操作完成！"
else
  echo "已取消 Git push 操作。"
fi