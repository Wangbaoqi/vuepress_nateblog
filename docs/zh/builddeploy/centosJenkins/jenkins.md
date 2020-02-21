---
type: web-server
tag: jenkins 
excerpt: '使用Docker、Jenkins、GitHub在centos中部署Vue'
---
# Docker、Jenkins部署Vue

::: tip
开始学习这块内容的初衷是想把自己的博客通过自动化的构建部署的方式部署，就不用每次将打包文件上传到服务器。因此，买了一台入门级服务器，申请的域名由于其他原因没有备案，暂时搁置了。。。
:::

**整个部署的过程**

1. 安装Docker
2. 通过Docker安装Jenkins
3. Jenkins安装插件以及配置SSH
4. Jenkins编写脚本
5. 自动构建



## Centos 使用

购买完服务器，我是通过SSH来远程登录来操作命令的
```shell
ssh root@ip # ip 是公网IP地址
```
输入设置的密码就完成登录了

**注意**
服务器需要添加安全组（这里除了系统默认添加的，如果在服务器中安装了Jenkins，需要给Jenkins配置端口号的话，需要额外添加一项），如图：

![server-security](https://cdn.img.wenhairu.com/images/2019/11/25/A5O2u.png)

这个新增的端口分配给Jenkins配置页面，（这个是后话）。。。

接下来时Docker的安装。


## Docker 安装以及使用
Docker的安装有很多种方式，不过这里我是在Linux下安装，因此使用命令行的方式。
安装的方式有很多，我这里采用了[runoob](https://www.runoob.com/)的安装方式[Centos安装Docker](https://www.runoob.com/docker/centos-docker-install.html)
安装成功之后，测试一下：

```shell
$ docker # 可以查看所有docker commond

$ docker info # 可以查看docker的所有信息

$ docker container ls # 可以看到docker中所有容器，此处应该可以看到之前运行的hello-world容器 
```
安装完成之后，顺便修改一下register mirror, 这里使用的是 http://hub-mirror.c.163.com

```shell
# 编辑配置文件
$ vim /etc/docker/daemon.json

# 添加加速地址
{
  "registry-mirrors": ["http://hub-mirror.c.163.com"]
}

# 生效
$ sudo systemctl daemon-reload

# restart docker 
$ sudo systemctl restart docker

# 查看
$ docker info
```
配置正确的话，如下图:
![docker-register](https://cdn.img.wenhairu.com/images/2019/11/26/A5i4C.png)


## Jenkins 安装

Jenkins的安装是通过docker来安装的 

```shell  
# 切勿docker pull jenkins已经废弃
$ docker pull jenkins/jenkins 
# 新建文件件 j_vue
$ mkdir /root/j_vue
# 设置权限
$ sudo chown 777 /root/j_vue 
# 启动Jenkins
$ docker run -d --name jenkins_nate -p 8081:8080 -p 50000:50000 -v /root/j_vue:/var/jenkins_home jenkins/jenkins

# -d 后台运行
# -- name jenkins_nate 容器的name
# -p 8081:8081 Jenkins默认网页访问端口为8080，将端口映射到外部主机
# /root/j_vue:/var/jenkins_home 把新建的j_vue映射到var/jenkins_home
```
启动之后等待。。顺利的话就可以配置Jenkins了


## Jenkins 配置

这里访问http://[公网IP地址]:8081/，就可以进入配置页面了

首次进入需要解锁Jenkins，需要按照给出的路径获取key

```js
# 解锁Jenkins
$ docker exec jenkins_nate cat /var/jenkins_home/secrets/initialAdminPassword
```
然后进入新手入门安装插件配置页面，选择推荐插件安装，等待。。。。

**这里可能会安装失败**，可以选择重试或者继续进入系统选择「系统管理-插件管理」页面，重新安装失败的插件（一般情况下正常）

之后会进入创建用户页面，以及实例配置页面，默认进入。

顺利的话，已经进入到Jenkins系统页面。

![jenkins-home](https://cdn.img.wenhairu.com/images/2019/11/26/A5heT.png)

**接下来我们要配置部署，需要安装插件 publish over SSH，和node**

![jenkin-conf](https://cdn.img.wenhairu.com/images/2019/11/26/AnmDj.png)
选择插件管理-可选插件里搜索 publish over SSH，和node 安装后重启

![jenkin-conf](https://cdn.img.wenhairu.com/images/2019/11/26/AnWIq.png)

接下来，配置**publish over SSH** 

![jenkin-conf](https://cdn.img.wenhairu.com/images/2019/11/26/An640.png)

填完之后，可以点击**Test Configuration** 是否连接成功

配置node
![jenkin-conf](https://cdn.img.wenhairu.com/images/2019/11/26/A5xGv.png)

配置完之后，新建一个任务，选择自由风格
![jenkin-conf](https://cdn.img.wenhairu.com/images/2019/11/26/A5vAG.png)

完成之后，就会有一个工程

![jenkin-conf](https://cdn.img.wenhairu.com/images/2019/11/26/AnK1H.png)

配置这个工程, 首先是项目介绍以及源码地址

![jenkin-conf](https://cdn.img.wenhairu.com/images/2019/11/26/Anqcg.png)

其次是构建方式

![jenkin-conf](https://cdn.img.wenhairu.com/images/2019/11/26/AnF3K.png)

之后构建脚本

![jenkin-conf](https://cdn.img.wenhairu.com/images/2019/11/26/AnYf3.png)

**构建脚本**

```shell
$ docker stop jenkins_vueblog || true \
  && docker rm jenkins_vueblog || true \
  && cd /root/j_vue/workspace/nateBlog  \
  && docker build  -t jenkins_vueblog  . \
  && docker run -d -p 80:80 --name jenkins_vueblog -v /root/j_vue/workspace/nateBlog/dist:/usr/share/nginx/html -v /root/j_vue/workspace/nateBlog/nginx.conf:/etc/nginx/nginx.conf jenkins_vueblog 

# docker stop jenkins_vueblog 停止jenkins_vueblog容器
# docker rm jenkins_vueblog 移除jenkins_vueblog容器
# docker run -d -p 80:80 ...  重启jenkins_vueblog容器 映射NGINX配置文件以及打包文件映射到NGINX html文件中
```

## 准备Vue项目

这里因为是自己的博客，是基于Vuepress开发的，重写的theme，[github nate.wang's blog vuepress](https://github.com/Wangbaoqi/vuepress_nateblog) 欢迎star 

## Vue项目增加NGINX配置文件

这里**暂时**在项目的根目录里新增NGINX配置文件，为了传到服务器中，**之后会在docker中安装nginx**

```shell
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}

http {
  include       /etc/nginx/mime.types;
  default_type  application/octet-stream;

  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

  access_log  /var/log/nginx/access.log  main;

  sendfile        on;
  #tcp_nopush     on;

  keepalive_timeout  65;

  gzip  on;
  gzip_types text/plain application/javascript text/css;

  # 虚拟主机server块
  server {
      # 端口
      listen   80;
      # 匹配请求中的host值
      server_name  localhost;
      
      # 监听请求路径
      location / {
          root   /usr/share/nginx/html;
          index  index.html index.htm;
      }
      #location /api {
        # 路径重写
        #rewrite  /api/(.*)  /$1  break;
        # 代理服务器
        #proxy_pass http://172.18.0.5:3000/;
      #}

      #error_page  404              /404.html;

      # redirect server error pages to the static page /50x.html
      #
      error_page   500 502 503 504  /50x.html;
      location = /50x.html {
          root   /usr/share/nginx/html;
      }
  }
  include /etc/nginx/conf.d/*.conf;
}
```
## Vue项目增加docker配置文件

```shell
FROM nginx

EXPOSE 80
```

## 开始构建部署 

项目上传到GitHub之后，默认分支是master分支。

**控制台输出**

![jenkin-conf](https://cdn.img.wenhairu.com/images/2019/11/26/AnJAd.png)

**部署成功**
![jenkin-conf](https://cdn.img.wenhairu.com/images/2019/11/26/AnwBf.png)

**访问公网IP**
[nate.wang's home](http://49.233.132.251/)
