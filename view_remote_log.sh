#!/bin/bash

# 获取用户输入的分支名
read -p "请输入分支名: " branch_name

# 执行 git fetch 命令
git fetch origin $branch_name

# 执行 git log 命令
git log origin/$branch_name
