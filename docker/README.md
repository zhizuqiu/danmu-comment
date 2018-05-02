# docker版本服务端

## 你可以从docker hub直接pull下来镜像

``` ruleslanguage
docker pull zhizuqiu/danmu-comment

docker run -d -p 8003:8003 --restart=always zhizuqiu/danmu-comment
```
内部端口为8003

## 或者自己构建镜像
这里以centos为例：
首先确保安装有git工具

``` ruleslanguage
yum install -y git
```
clone源码

``` ruleslanguage
git clone https://github.com/zhizuqiu/danmu-comment.git
```
进入目录，并执行docker build命令

``` ruleslanguage
cd danmu-comment/docker
docker build -t="danmu-comment:v1" .
```
tip： build之前，你可以通过修改Dockerfile文件，修改EXPOSE的端口，默认为8003

然后就可以启动这个容器了

``` ruleslanguage
docker run -d -p 8003:8003 danmu-comment:v1
```
其中8003:8003，前者的8003要与你客户端的端口对应，后者的8003就是之前Dockerfile中EXPOSE的端口
