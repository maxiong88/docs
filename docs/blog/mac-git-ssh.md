---
title: mac版github配置ssh
description: 'mac版github配置ssh'
prev: './js-mp2'
next: ''
time: '2013-12-30'
---

今天使用 ./deploy.sh 来提交代码，出现了权限的问题，百度了一下 写下这篇mac版github配置ssh

1、首先运行终端，检查是否已经有SSH Key

``` bash
localhost:~ maxiong$ cd ~/.ssh
localhost:.ssh maxiong$ ls
```

这两个命令就是检查是否已经存在 id_rsa.pub 或 id_dsa.pub 文件，如果文件已经存在，那么你可以跳过步骤2，直接进入步骤

2、创建一个SSH key

``` bash 
localhost:.ssh maxiong$ ssh-keygen -t rsa -C "78497291@qq.com" // 注册邮箱  
```

接着又会提示你输入两次密码（该密码是你push文件的时候要输入的密码，而不是github管理者的密码）

``` bash
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/maxiong/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /Users/maxiong/.ssh/id_rsa.
Your public key has been saved in /Users/maxiong/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:/HhY1WNRHrj3cRGZQTMrwYedqaEzCT6rrdO+dJ0NBEE 78497291@qq.com
The key's randomart image is:
+---[RSA 2048]----+
|          .Eo.*OO|
|         .  .*.@=|
|        . . +oO.o|
|       . o *.+.+.|
|        S + o.. +|
|         *  . + .|
|        *.o. o . |
|       o.+.      |
|       .+o.      |
+----[SHA256]-----+
```

3、添加公钥到你的远程仓库（github）

a、查看你生成的公钥，输入：

``` bash
localhost:.ssh maxiong$ cat ~/.ssh/id_rsa.pub
```

b、登陆你的github帐户，创建key 将a打印出来的数据复制到github上。点击保存

c、验证下这个key是不是正常工作

``` bash
localhost:.ssh maxiong$ ssh -T git@github.com
Hi maxiong88! You've successfully authenticated, but GitHub does not provide shell access.
```
因为我没有设置密码所以输入c以后直接提示我成功了