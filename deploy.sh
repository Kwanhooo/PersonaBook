#!/bin/bash
# 此脚本使用Docker部署PersonaBook项目的前端部分
# 使用方法: ./deploy.sh port=9081 target_dir=~/PersonaBook svn=github

# 定义颜色
BLUE="\033[1;34m"
GREEN="\033[1;32m"
NC="\033[0m" # No Color

# 容器名称
CONTAINER_NAME=persona-book-frontend
# 远程仓库地址
REMOTE_GITHUB='git@github.com:Kwanhooo/PersonaBook.git'
REMOTE_GITEE='git@gitee.com:Kwanhooo/PersonaBook.git'

# 部署端口号（如果没有传入参数，则使用默认值）
port=9081
# 项目目录（如果没有传入参数，则使用默认值）
target_dir=~/PersonaBook
# SVN
svn='gitee'

# 解析命令行参数
for ARGUMENT in "$@"
do
    KEY=$(echo $ARGUMENT | cut -f1 -d=)
    VALUE=$(echo $ARGUMENT | cut -f2 -d=)

    if [ "$KEY" = "port" ]; then
        port=$VALUE
    elif [ "$KEY" = "target_dir" ]; then
        target_dir=$VALUE
    elif [ "$KEY" = "svn" ]; then
        svn=$VALUE
    fi
done

# 根据svn选择远程仓库
if [ "$svn" = "github" ]; then
    remote=$REMOTE_GITHUB
elif [ "$svn" = "gitee" ]; then
    remote=$REMOTE_GITEE
else
    echo -e "${BLUE}未知的svn参数: $svn，使用默认的GitHub仓库${NC}"
    remote=$REMOTE_GITHUB
fi

echo -e "${BLUE}部署参数 - 端口: $port, 目标目录: $target_dir, 容器名称: $CONTAINER_NAME, 远程仓库: $remote${NC}"

# 1. 获取最新代码
echo -e "${BLUE}步骤1/6: 正在获取最新代码...${NC}"
if [ ! -d "$target_dir" ]; then
  git clone $remote $target_dir
  echo -e "${GREEN}仓库克隆完成。${NC}"
else
  cd $target_dir
  git pull $remote
  echo -e "${GREEN}仓库更新完成。${NC}"
fi

# 进入项目目录
cd $target_dir

# 2. 安装项目依赖
echo -e "${BLUE}步骤2/6: 正在安装依赖...${NC}"
rm -rf pnpm-lock.yaml node_modules/
pnpm install
echo -e "${GREEN}依赖安装完成。${NC}"

# 3. 构建生产环境静态代码
echo -e "${BLUE}步骤3/6: 正在构建生产环境代码...${NC}"
pnpm run build
echo -e "${GREEN}生产环境代码构建完成。${NC}"

# 4. 构建Docker镜像
echo -e "${BLUE}步骤4/6: 正在构建Docker镜像...${NC}"
docker build -t $CONTAINER_NAME .
echo -e "${GREEN}Docker镜像构建完成。${NC}"

# 5. 停止并删除旧的Docker容器实例（如果存在）
echo -e "${BLUE}步骤5/6: 正在部署Docker容器...${NC}"
docker stop $CONTAINER_NAME && docker rm $CONTAINER_NAME
echo -e "${GREEN}旧容器已停止并删除。${NC}"

# 6. 启动Docker容器实例
docker run -p $port:80 \
--restart=always \ll
-v /root/log/:/usr/share/nginx/log/ \
--name $CONTAINER_NAME \
-d $CONTAINER_NAME
echo -e "${GREEN}新容器已启动。${NC}"

echo -e "${GREEN}PersonaBook前端部署完成。${NC}"
