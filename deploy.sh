#!/bin/bash
#================================================================
# HEADER
#================================================================
#% SYNOPSIS
#+    ${SCRIPT_NAME} [-h] [-p[port]] [-t[target_dir]] [-v[provider]] [-c[container_name]] [-l[log_dir]]
#%
#% DESCRIPTION
#%    此脚本使用Docker部署PersonaBook项目的前端部分。它允许用户指定端口号、目标目录、
#%    代码仓库提供者、容器名称及日志目录等参数，以实现灵活部署。
#%
#% OPTIONS
#%    -p [port], --port=[port]               设置部署端口号 (默认为9081)
#%    -t [target_dir], --target_dir=[target_dir] 设置项目目录 (默认为~/PersonaBook)
#%    -v [provider], --provider=[provider]   设置代码仓库提供者 (github 或 gitee，默认为gitee)
#%    -c [container_name], --container_name=[container_name] 设置Docker容器名称
#%    -l [log_dir], --log_dir=[log_dir]      设置日志目录 (默认为/root/log/)
#%    -h, --help                            打印帮助信息
#%
#% EXAMPLES
#%    ${SCRIPT_NAME} -p 9081 -t /path/to/PersonaBook -v github -c my-container -l /path/to/log
#%
#================================================================
#- IMPLEMENTATION
#-    version         PersonaBook Frontend Deploy Script 1.2.0
#-    author          Kwanhooo
#-    copyright       Copyright (C) 2024 Kwanhooo
#-    license         GNU General Public License Version 3
#-    script_id       pb-f-d-1
#-
#================================================================
#  HISTORY
#     2024/02/22 : Kwanhooo : 脚本创建
#     2024/02/23 : Kwanhooo : 添加参数解析和错误处理功能
#
#================================================================
# END_OF_HEADER
#================================================================


# 定义颜色常量
BLUE="\033[1;34m"
GREEN="\033[1;32m"
RED="\033[1;31m" # 用于错误消息
NC="\033[0m" # 无色

# 远程仓库地址常量
REMOTE_GITHUB='git@github.com:Kwanhooo/PersonaBook.git'
REMOTE_GITEE='git@gitee.com:Kwanhooo/PersonaBook.git'

# 初始化默认参数变量
port=9081
target_dir=~/PersonaBook
provider='github'
container_name="persona-book-frontend"
log_dir=~/log/persona-book-frontend

# 提示输入-h查看用法
if [ $# -eq 0 ]; then
  echo -e "${BLUE}提示：使用 -h 可查看用法${NC}"
fi

# 使用getopts解析命令行参数
while getopts ":p:t:v:c:l:h" opt; do
  case ${opt} in
    p ) port=$OPTARG ;;
    t ) target_dir=$OPTARG ;;
    v ) provider=$OPTARG ;;
    c ) container_name=$OPTARG ;;
    l ) log_dir=$OPTARG ;;
    h ) echo -e "${BLUE}用法: $0 [-p 端口号] [-t 源代码保存目录] [-v 远程仓库（可选值：github\gitee）] [-c 容器名称] [-l 日志保存目录]${NC}"
        exit 0 ;;
    \? ) echo -e "${BLUE}选项 -${OPTARG} 无效。使用-h查看用法。${NC}"
         exit 1 ;;
  esac
done

# 选择远程仓库
remote=$REMOTE_GITEE # 默认为Gitee
if [ "$provider" = "github" ]; then
  remote=$REMOTE_GITHUB
fi

echo -e "${BLUE}部署参数 - 端口: $port, 目标目录: $target_dir, 容器名称: $container_name, 日志目录: $log_dir, 远程仓库: $remote${NC}"

# 1. 获取最新代码
echo -e "${BLUE}步骤1/6: 正在获取最新代码...${NC}"
if [ ! -d "$target_dir" ]; then
  if git clone $remote "$target_dir"; then
    echo -e "${GREEN}仓库克隆完成${NC}"
  else
    echo -e "${RED}仓库克隆失败${NC}"
    exit 1
  fi
else
  cd "$target_dir" || exit
  if ! git pull $remote; then
    echo -e "${RED}仓库更新失败，正在尝试重新克隆...${NC}"
    cd ..
    rm -rf "$target_dir"  # 删除旧的源码目录
    # 重新尝试克隆
    if git clone $remote "$target_dir"; then
      echo -e "${GREEN}仓库重新克隆完成${NC}"
    else
      echo -e "${RED}仓库重新克隆失败${NC}"
      exit 1
    fi
  else
    echo -e "${GREEN}仓库更新完成${NC}"
  fi
fi

# 2. 安装项目依赖
echo -e "${BLUE}步骤2/6: 正在安装依赖...${NC}"
if rm -rf pnpm-lock.yaml node_modules/ && pnpm install; then
  echo -e "${GREEN}依赖安装完成${NC}"
else
  echo -e "${RED}依赖安装失败，请检查pnpm是否正确安装${NC}"
  exit 1
fi

# 3. 构建生产环境静态代码
echo -e "${BLUE}步骤3/6: 正在构建生产环境代码...${NC}"
if pnpm run build; then
  echo -e "${GREEN}生产环境代码构建完成${NC}"
else
  echo -e "${RED}代码构建失败，请检查错误信息${NC}"
  exit 1
fi

# 4. 构建Docker镜像
echo -e "${BLUE}步骤4/6: 正在构建Docker镜像...${NC}"
if docker build -t "$container_name" .; then
  echo -e "${GREEN}Docker镜像构建完成${NC}"
else
  echo -e "${RED}Docker镜像构建失败，请检查Docker是否正确安装${NC}"
  exit 1
fi

# 5. 停止并删除旧的Docker容器实例（如果存在）
echo -e "${BLUE}步骤5/6: 正在部署Docker容器...${NC}"
docker stop "$container_name" > /dev/null 2>&1
docker rm "$container_name" > /dev/null 2>&1
echo -e "${GREEN}旧容器已停止并删除${NC}"

# 6. 启动Docker容器实例
if docker run -p "$port":80 --restart=always -v "$log_dir":/usr/share/nginx/log/ --name "$container_name" -d "$container_name"; then
  echo -e "${GREEN}新容器已启动${NC}"
else
  echo -e "${RED}容器启动失败${NC}"
  exit 1
fi

echo -e "${GREEN}PersonaBook前端部署完成${NC}"
