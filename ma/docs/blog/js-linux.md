1.linux的分区参考阿里云https://help.aliyun.com/document_detail/25426.html?spm=5176.7741274.6.151.mN0AMv
   1.1如有磁盘
        运行 fdisk /dev/xvdb，对数据盘进行分区。根据提示，依次输入 n，p，1，两次回车，wq，分区就开始了
		运行 fdisk -l 命令，查看新的分区。新分区 xvdb1 已经创建好。如下面示例中的/dev/xvdb1。
		运行 echo /dev/xvdb1 /mnt ext3 defaults 0 0 >> /etc/fstab 写入新分区信息。完成后，可以使用 cat /etc/fstab 命令查看。
		运行 mount /dev/xvdb1 /mnt 挂载新分区，然后执行 df -h 查看分区。如果出现数据盘信息，说明挂载成功，可以使用新分区了。
2.linux的配置信息
    1.安装nginx 参考http://www.runoob.com/linux/nginx-install-setup.html
	    一、安装编译工具及库文件
		    yum -y install make zlib zlib-devel gcc-c++ libtool  openssl openssl-devel
			（安装目录为/usr/lib）
		二、首先要安装 PCRE （PCRE 作用是让 Ngnix 支持 Rewrite 功能。）文件安装在usr/local/src下
            官网http://www.pcre.org/
            下载地址https://sourceforge.net/projects/pcre/files/pcre	
                1.1、下载 PCRE 安装包，下载地址： http://downloads.sourceforge.net/project/pcre/pcre/8.39/pcre-8.39.tar.gz	
                1.2、解压安装包:[root@bogon mnt]# tar zxvf pcre-8.39.tar.gz
                1.3、进入安装包目录[root@bogon mnt]# cd pcre-8.39
                1.4、编译安装 [root@bogon pcre-8.39]# ./configure(配置)   [root@bogon pcre-8.39]# make(编译) && make install(安装)  make uninstall(卸载)
                1.5、查看pcre版本[root@bogon pcre-8.39]# pcre-config --version
		三、安装 Nginx
            wget http://nginx.org/download/nginx-1.10.1.tar.gz
			2、解压安装包 [root@bogon src]# tar zxvf nginx-1.6.2.tar.gz
			3、进入安装包目录 cd nginx-1.6.2
			4、编译安装 ./configure --prefix=/usr/local/webserver/nginx   make && make install
			5、查看nginx版本 /usr/local/webserver/nginx/sbin/nginx -v
		    启动
			进入cd /usr/local/webserver/nginx/sbin
			检查配置文件ngnix.conf的正确性命令：
			[root@bogon sbin]# /usr/local/webserver/nginx/sbin/nginx -t
			查看  cat /usr/local/webserver/nginx/conf/nginx.conf
			pid文件消失 /usr/local/webserver/nginx/sbin/nginx -c /usr/local/webserver/nginx/conf/nginx.conf
			
			
			centos7 以后mysql  使用mariaDB
			  安装mysql  使用 yum -y install mariaDB
			  修改密码  mysqladmin -uroot -p password xiong3
			  
	systemctl start mariadb  #启动MariaDB
	systemctl stop mariadb  #停止MariaDB
	systemctl restart mariadb  #重启MariaDB
	systemctl enable mariadb  #设置开机启动
	
	 firewall-cmd --zone=public --add-port=3306/tcp --permanent   firewall-cmd --reload
			
			whereis 文件名  查找
			添加用户
			cat /etc/passwd 查看用户列表
			查看端口
			   netstat -ntlp
			启动nginx 
			   ./sbin/nginx
			关闭nginx
			   ./sbin/nginx -s stop
			重启ngnix
                ./nginx -s reload			
			关闭防火墙 
			   systemctl stop firewalld
			开启防火墙
			   systemctl start firewalld
			centos7 firewalld防火墙基本操作   
			    启动：# systemctl start  firewalld 
				查看状态：# systemctl status firewalld 或者 firewall-cmd --state 
				停止：# systemctl disable firewalld 
				禁用：# systemctl stop firewalld
				
				永久开启80端口：firewall-cmd --zone=public --add-port=80/tcp –permanent 
				说明：--add-port=80/tcp  #添加端口，格式为：端口/通讯协议  
                      --permanent   #永久生效，没有此参数重启后失效 
					  更新防火墙规则：# firewall-cmd --reload 
                                       # firewall-cmd --complete-reload 
                                       两者的区别就是第一个无需断开连接，就是firewalld特性之一动态添加规则，第二个需要断开连接，类似重启服务 