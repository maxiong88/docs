---
title: centos7.2+nginx+php+mariadb搭建站点 
date: 2015-09-30 10:45:33
tags:
---
# 前沿

centos7.2+nginx+php+maridb配置信息，centos7.2注意事项：防火墙、数据库、一些命令。
Nginx是一个高性能的HTTP和反向代理服务器，同时还是IMAP/POP3/SMTP代理服务器，该程序由俄罗斯Rambler.ru 站点开 发，Nginx因为性能稳定、低系统资源消耗而闻名，近几年Nginx在国内已经成炙热化状态

<!-- more -->

# 系统centos7.2
## 一、linux挂载磁盘
###### 运行 fdisk -l 命令查看数据盘。注意：在没有分区和格式化数据盘之前，使用 df -h 命令是无法看到数据盘的
```
[root@mmmmmmmmm ~]# df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/xvda1       40G  1.1G   37G   3% /
devtmpfs        487M     0  487M   0% /dev
tmpfs           496M     0  496M   0% /dev/shm
tmpfs           496M  6.5M  490M   2% /run
tmpfs           496M     0  496M   0% /sys/fs/cgroup
tmpfs           100M     0  100M   0% /run/user/0
```
###### 如果执行了 fdisk -l 命令后，没有发现 /dev/xvdb，则表示您的实例没有数据盘
```
[root@mmmmmmmm ~]# fdisk -l

Disk /dev/xvda: 42.9 GB, 42949672960 bytes, 83886080 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x635e6c7d

    Device Boot      Start         End      Blocks   Id  System
/dev/xvda1            2048    83886079    41942016   83  Linux

* * * Disk /dev/xvdb: 10.7 GB, 10737418240 bytes, 20971520 sectors * * *
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes

```
###### 运行 fdisk /dev/xvdb，对数据盘进行分区。根据提示，依次输入 n，p，1，两次回车，wq，分区就开始了。
`最好先格式化磁盘，不然会出现分区数从2开始 Partition number (2-4, default 2)`
```
[root@mmmmmmmm ~]# fdisk /dev/xvdb
Welcome to fdisk (util-linux 2.23.2).

Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table
Building a new DOS disklabel with disk identifier 0x38695c0c.

Command (m for help): n
Partition type:
   p   primary (0 primary, 0 extended, 4 free)
   e   extended
Select (default p): p
Partition number (1-4, default 1): 1
First sector (2048-20971519, default 2048): 
Using default value 2048
Last sector, +sectors or +size{K,M,G} (2048-20971519, default 20971519): 
Using default value 20971519
Partition 1 of type Linux and of size 10 GiB is set

Command (m for help): wq
The partition table has been altered!

Calling ioctl() to re-read partition table.
Syncing disks.
```
###### 运行 fdisk -l 命令，查看新的分区。新分区 xvdb1 已经创建好。如下面示例中的/dev/xvdb1。
```
[root@mmmmmmm ~]# fdisk -l

Disk /dev/xvda: 42.9 GB, 42949672960 bytes, 83886080 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x635e6c7d

    Device Boot      Start         End      Blocks   Id  System
/dev/xvda1            2048    83886079    41942016   83  Linux

Disk /dev/xvdb: 10.7 GB, 10737418240 bytes, 20971520 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x38695c0c

    Device Boot      Start         End      Blocks   Id  System
* * * /dev/xvdb1            2048    20971519    10484736   83  Linux  * * *
```
###### 运行 mkfs.ext3 /dev/xvdb1，对新分区进行格式化。格式化所需时间取决于数据盘大小
`自动完成`
```
[root@mmmmmmmm ~]# mkfs.ext3 /dev/xvdb1
mke2fs 1.42.9 (28-Dec-2013)
Filesystem label=
OS type: Linux
Block size=4096 (log=2)
Fragment size=4096 (log=2)
Stride=0 blocks, Stripe width=0 blocks
655360 inodes, 2621184 blocks
131059 blocks (5.00%) reserved for the super user
First data block=0
Maximum filesystem blocks=2684354560
80 block groups
32768 blocks per group, 32768 fragments per group
8192 inodes per group
Superblock backups stored on blocks: 
    32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632

Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (32768 blocks): done
Writing superblocks and filesystem accounting information: done 
```
###### 运行 echo /dev/xvdb1 /mnt ext3 defaults 0 0 >> /etc/fstab 写入新分区信息。完成后，可以使用 cat /etc/fstab 命令查看。
```
[root@mmmmmmm ~]#  cat /etc/fstab

#
# /etc/fstab
# Created by anaconda on Tue May  3 13:48:10 2016
#
# Accessible filesystems, by reference, are maintained under '/dev/disk'
# See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info
#
UUID=80b9b662-0a1d-4e84-b07b-c1bf19e72d97 /                       ext4    defaults        1 1
/dev/xvdb1 /dmx ext3 defaults 0 0
/dev/xvdb1 /mnt ext3 defaults 0 0
/dev/xvdb1 /mnt ext3 defaults 0 0
```
###### 运行 mount /dev/xvdb1 /mnt 挂载新分区，然后执行 df -h 查看分区
```
[root@mmmmmmm ~]# df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/xvda1       40G  1.1G   37G   3% /
devtmpfs        487M     0  487M   0% /dev
tmpfs           496M     0  496M   0% /dev/shm
tmpfs           496M  6.5M  490M   2% /run
tmpfs           496M     0  496M   0% /sys/fs/cgroup
tmpfs           100M     0  100M   0% /run/user/0
/dev/xvdb1      9.8G   23M  9.2G   1% /mnt
```
###### 如果出现数据盘信息，说明挂载成功，可以使用新分区了。
`格式化和挂载数据盘结束`
```
由于系统使用centos7.2 他的防火墙是firewalld
1.开启防火墙 systemctl start firewalld
2.关闭防火墙 systemctl stop firewalld
防火墙进入规则
    centos7 firewalld防火墙基本操作   
	启动：# systemctl start  firewalld
	查看状态：# systemctl status firewalld 或者 firewall-cmd --state
	停止：# systemctl disable firewalld
	禁用：# systemctl stop firewalld
	永久开启80端口：firewall-cmd --zone=public --add-port=80/tcp --permanent
    永久开启3306端：firewall-cmd --zone=public --add-port=3306/tcp --permanent
	说明：--add-port=80/tcp #添加端口，格式为：端口/通讯协议
        --permanent #永久生效，没有此参数重启后失效
    更新防火墙规则：
        # firewall-cmd --reload
        # firewall-cmd --complete-reload
    两者的区别就是第一个无需断开连接，就是firewalld特性之一动态添加规则，第二个需要断开连接，类似重启服务
```
```
由于centos 7.2 以后的数据库使用mariaDB 所以我们安装这个就可以了
安装mysql  使用 yum -y install mariaDB
修改密码  mysqladmin -u root -p password 新密码
systemctl start mariadb  #启动MariaDB
systemctl stop mariadb  #停止MariaDB
systemctl restart mariadb  #重启MariaDB
systemctl enable mariadb  #设置开机启动
```
```
chown www.www www 将文件夹改拥有者 （组：用户 文件名）
rpm -qa|grep -i php  查看php安装包
chmod 751 file 修改文件权限


```
## 二、安装nginx  `文件下载安装在usr/local/src下`
###### 安装nginx 参考http://www.runoob.com/linux/nginx-install-setup.html
* 安装编译工具及库文件
 * yum -y install make zlib zlib-devel gcc-c++ libtool  openssl openssl-devel  `默认安装 目录/usr/lib
 * 首先要安装 PCRE （PCRE 作用是让 Ngnix 支持 Rewrite 功能。）
        官网http://www.pcre.org/
        下载 PCRE 安装包，下载地址： http://downloads.sourceforge.net/project/pcre/pcre/8.39/pcre-8.39.tar.g
        wget下载 [root@mmmmm mnt]# wget http://downloads.sourceforge.net/project/pcre/pcre/8.39/pcre-8.39.tar.gz
        解压安装包:[root@mmmmm mnt]# tar zxvf pcre-8.39.tar.gz
        进入安装包目录[root@mmmmm mnt]# cd pcre-8.39
        编译安装 [root@bogon pcre-8.39]# ./configure(配置)   
        [root@mmmmmmm pcre-8.39]# make(编译) && make install(安装)  `make uninstall(卸载)`
        查看pcre版本[root@mmmmmm pcre-8.39]# pcre-config --version
 * 安装 Nginx  `/usr/local/webserver/nginx`
        wget http://nginx.org/download/nginx-1.10.1.tar.gz
        解压安装包  tar zxvf nginx-1.10.1.tar.gz
        进入安装包目录 cd nginx-1.10.1
        编译安装 ./configure --prefix=/usr/local/webserver/nginx   make && make install
        进入 /usr/local/webserver/nginx 即 [root@iZ28zohlyq2Z nginx]
        启动nginx [root@localhost nginx]# ./sbin/nginx
        关闭防火墙 [root@localhost nginx]# systemctl stop firewalld
        在浏览器输入ip或者域名既可以访问网站
 * nginx.confg配置

## 安装php与php扩展
`使用yum 安装 yum -y install php php-devel php*`
```
结束以后重启nginx服务
报错404
错误日志
31160#0: *35 connect() failed (111: Connection refused) while connecting to upstream, client
大概意思是你没有启动或者配置php-fpm
最后yum -y install php-fpm
启动
systemctl start php-fpm
```
## 安装mysql
 * yum -y install gcc gcc-c++ make autoconf libtool-ltdl-devel gd-devel freetype-devel libxml2-devel libjpeg-devel libpng-devel openssl-devel curl-devel bison patch unzip libmcrypt-devel libmhash-devel ncurses-devel sudo bzip2 flex libaio-devel  
 * yum -y install mariaDB*  
 * 安装完成 需要启动才可以使用 systemctl start mariadb
 * 修改完密码  使用  mysqladmin -u root -p 登录
```
ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: NO) 
mysqladmin -u root -p 从新登陆
```
