#! /bin/sh

git add .
read -p "input commit message: " msg
git commit -m "$msg"

# 确认是否执行 git push 操作
echo "是否执行 git push 操作？(y/n)"
read confirm_push

if [ "$confirm_push" == "y" ]; then
  # 提交之前先拉取
  git pull origin poultry
  git push origin poultry
  echo "Git push 操作完成！"
else
  echo "已取消 Git push 操作。"
fi
