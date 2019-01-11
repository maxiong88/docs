---
title: 使用Hexo搭建个人博客(基于hexo3.2)
date: 2016-09-10 19:52:38
tags:
---

## 前言 + 动机
 
由于云服务器的涨价，将wordpress迁移到hexo。
hexo+github简单方便，主要是免费。
哈哈哈哈哈哈

## 正文

本教程只针对windows + mac 用户

<!-- more -->

## 安装 git
 
下载并安装git，如果你想了解点Git的基础命令，推荐以下博文：

* [廖雪峰git](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)
* [github入门到精通](http://blog.csdn.net/v123411739/article/details/44071059/)

## 安装node.js

 下载并安装Node.js，（按需重启电脑）

## 安装hexo
 
 安装前先介绍几个hexo常用的命令,#后面为注释。

   ```html
    $ hexo g #完整命令为hexo generate，用于生成静态文件
    $ hexo s #完整命令为hexo server，用于启动服务器，主要用来本地预览
    $ hexo d #完整命令为hexo deploy，用于将本地文件发布到github上
    $ hexo n #完整命令为hexo new，用于新建一篇文章 hexo new "名称空格"
   ```
 进入git bash命令，安装hexo全局（ps：以下命令中的$符号只为了让教程和实际看起来一致，实际输入命令只需输入$ 后面的命令即可）

    $ npm install hexo-cli -g

 接下来创建放置博客文件的文件夹：hexo文件夹,在自己想要的位置创建文件夹，如我hexo文件夹的位置为F:\hexo。
 进入文件夹执行

    $ hexo init

 安装依赖包

    $ npm install

 让我们看看刚刚下载的hexo文件带来了什么，在F:\hexo内执行以下命令，

    $ hexo g
    $ hexo s

 然后用浏览器访问http://localhost:4000/,即可看到效果

## 注册Github帐号
 
  已有帐号可跳过

  创建repository
  repository相当于一个仓库，用来放置你的代码文件。
  进入首页可看到 new repository 按钮

  创建时，只需要填写Repository name即可，当然这个名字的格式必须为youname.github.io，例如我的为maxiong1.github.io

### 部署本地文件到github

#### 首先需要安装hexo-deployer-git

    $ npm install hexo-deployer-git --save

既然Repository已经创建了，当然是先把博客放到Github上去看看效果。编辑f：\hexo下的_config.yml文件，建议使用Notepad++。
另外记得一点，hexo的配置文件中任何’:’后面都是带一个空格的)

	  deploy: 
	  type: git
	  repository: https://github.com/maxiong1/maxiong1.github.io.git
	  branch: master

配置好以后保存，执行以下命令即可
  
	$ hexo g
	$ hexo d

执行上面的时候，可能会要你输入用户名和密码，皆为注册Github时的数据，输入密码是不显示任何东西的，输入完毕回车即可。（也可以使用ssh）

#### hexo配置文件

hexo里面有两个常用到的配置文件，分别是整个博客的配置文件F:\hexo\_config.yml和主题的配置文件F:\hexo\themes\landscape\_config.yml
hexo3.0以后使用的默认主题是landscape，因此你们的地址应该是F:\hexo\themes\landscape\_config.yml

```html
# Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# Site
title: 大熊！静香喊你回家吃饭
subtitle: 前端博客｛html5+css3、javascript｝
description: （web前端博客）这是一个神奇的网站，因为有哆啦A梦
author: 马雄
language: zh-CN
timezone:

# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: http://58lih.com
root: /
permalink: :year/:month/:day/:title/
permalink_defaults:

# Directory
source_dir: source
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render:

# Writing
new_post_name: :title.md # File name of new posts
default_layout: post
titlecase: false # Transform title into titlecase
external_link: true # Open external links in new tab
filename_case: 0
render_drafts: false
post_asset_folder: false
relative_link: false
future: true
highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace:

# Category & Tag
default_category: uncategorized
category_map:
tag_map:

# Date / Time format
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD
time_format: HH:mm:ss

# Pagination
## Set per_page to 0 to disable pagination
per_page: 10
pagination_dir: page

# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: landscape

# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repo: https://github.com/maxiong1/maxiong1.github.io.git

```

以上的改动不多，大多是介绍下功能。

### 发表一篇文章

1.在Git Bash执行命令：$ hexo new "my new post"
2.在F:\hexo\source\_post中打开my-new-post.md，打开方式使用makedownPad2或notepad++。

```html
title: my new post #可以改成中文的，如“新文章”
date: 2015-04-08 22:56:29 #发表日期，一般不改动
categories: blog #文章文类
tags: [博客，文章] #文章标签，多于一项时用这种格式，只有一项时使用tags: blog
---
#这里是正文，用markdown写，你可以选择写一段显示在首页的简介后，加上
<!--more-->#在<!--more-->之前的内容会显示在首页，之后的内容会被隐藏，当游客点击Read more才能看到。
```

写完文章后，你可以使用
1.$ hexo g生成静态文件。
2.$ hexo s在本地预览效果。
3.hexo d同步到github，
然后使用http://maxiong1.github.io进行访问。

### 使用ssh配置  (我是用的第一种)

```html
deploy: 
  type: git
  repository: git@github.com:maxiong1/maxiong1.github.io.git
  branch: master
```
这种配置方式，需要配置SSH key，教程如下：
鼠标右键任意地方，选择Git Bash，

    $ ssh-keygen -t rsa -C "your_email@youremail.com"

后面的your_email@youremail.com改为你的邮箱，之后会要求确认路径和输入密码，我们这使用默认的一路回车就行。成功的话会在C:\Users\Administrator下生成.ssh文件夹，进入该文件夹，打开id_rsa.pub，复制里面的key。
回到github，进入Settings，选择SSH and GPG Keys -> New SSH Key，title随便填，粘贴key。为了验证是否成功，在git bash下输入：

    $ ssh -T git@github.com

如果是第一次的会提示是否continue，输入yes就会看到：You’ve successfully authenticated， but GitHub does not provide shell access ，这就表示已成功连上github。
接下来我们要做的就是把本地仓库传到github上去，在此之前还需要设置username和email，因为github每次commit都会记录他们。

    $ git config --global user.name "your name"  
    $ git config --global user.email "your_email@youremail.com"

  