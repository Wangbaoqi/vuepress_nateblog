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
```



## Jenkins 安装以及使用

