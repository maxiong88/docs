---
title: git的一些使用方法
date: 2016-09-20 10:57:44
tags: git
---

git 入门

git 分支

git 问题

更新与 2018/03/28

<!-- more -->

# git 入门

###### 克隆现有的仓库

克隆仓库的命令格式是 git clone [url] 。 比如，要克隆 Git 的可链接库 libgit2，可以用下面的命令：

	$ git clone https://github.com/libgit2/libgit2
	
这会在当前目录下创建一个名为 “libgit2” 的目录，并在这个目录下初始化一个 .git 文件夹，从远程仓库拉取下所有数据放入 .git 文件夹，然后从中读取最新版本的文件的拷贝。 如果你进入到这个新建的 libgit2 文件夹，你会发现所有的项目文件已经在里面了，准备就绪等待后续的开发和使用。 如果你想在克隆远程仓库的时候，自定义本地仓库的名字，你可以使用如下命令：

	$ git clone https://github.com/libgit2/libgit2 mylibgit
	
这将执行与上一个命令相同的操作，不过在本地创建的仓库名字变为 `mylibgit`。

###### 记录每次更新到仓库

[文件的状态变化周期](https://git-scm.com/book/en/v2/images/lifecycle.png)

* untracked 未跟踪  此文件在文件夹中, 但并没有加入到git库, 不参与版本控制. 通过git add 状态变为Staged
* unmodified 未更改 文件已经入库, 未修改, 即版本库中的文件快照内容与文件夹中完全一致. 这种类型的文件有两种去处, 如果它被修改, 而变为Modified. 如果使用git rm移出版本库, 则成为Untracked文件
* modified 更改 文件已修改, 仅仅是修改, 并没有进行其他的操作. 这个文件也有两个去处, 通过git add可进入暂存staged状态, 使用git checkout 则丢弃修改过, 返回到unmodify状态, 这个git checkout即从库中取出文件, 覆盖当前修改
* staged 暂存状态  执行git commit则将修改同步到库中, 这时库中的文件和本地文件又变为一致, 文件为Unmodify状态. 执行git reset HEAD filename取消暂存, 文件状态为Modified

###### 检查当前文件状态 可以用 git status 命令

	$ git status
	On branch master
	Your branch is up-to-date with 'origin/master'.

	nothing to commit, working tree clean // 这说明你现在的工作目录相当干净。换句话说，所有已跟踪文件在上次提交后都未被更改过
	
###### 	状态简览 使用 git status -s 命令或 git status --short 命令

![git status -s](../css/images/20180328152134.png)

	 M README  // 修改过的文件前面标记是 M 没有 add
	MM Rakefile  // 你可能注意到了 M 有两个可以出现的位置，
					出现在右边的 M 表示该文件被修改了但是还没放入暂存区，
					出现在靠左边的 M 表示该文件被修改了并放入了暂存区
	A  lib/git.rb  // 新添加到暂存区的文件前面标记是 A
	M  lib/simplegit.rb // 修改过的文件前面标记是 M 并add
	?? LICENSE.txt  // 新添加的未跟踪文件前面标记是 ??

###### 忽略文件 .gitignore

.gitignore只能忽略那些原来没有被追踪的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的。那么解决方法就是先把本地缓存删除（改变成未被追踪状态），然后再提交：

	git rm -r --cached .
	git add .
	git commit -m 'update .gitignore'

注意：
不要误解了 .gitignore 文件的用途，该文件只能作用于 Untracked Files，也就是那些从来没有被 Git 记录过的文件（自添加以后，从未 add 及 commit 过的文件）。
如果文件曾经被 Git 记录过，那么.gitignore 就对它们完全无效。只能清除缓存

###### 查看已暂存和未暂存的修改

	* git diff 要查看尚未暂存的文件更新了哪些部分，不加参数直接输入
	* git diff --cached 若要查看已暂存的将要添加到下次提交里的内容，可以用 
	* 或使用 git diff --staged
	
###### 跳过使用暂存区域
	
	* git commit -a -m "信息" 这样就不用在 git  add 了
	
###### 移动文件

	* 必须在版本控制之下，不忍会报错   fatal: not under version control, 
	* git mv file_from file_to   

###### 查看提交历史
	
	* git log -p 用来显示每次提交的内容差异
	* git log --stat 每次提交的简略的统计信息
	* git log --oneline 单线图
	* git log --decorate 装饰
	* git log --graph 图表
	* git log --all 全部

###### 取消暂存的文件

	* git  reset
	
###### 撤消对文件的修改

	* git checkout 

# git  分支
	
	* git branch "xxxx"  创建分支
	* git checkout "xxx" 切换分支
	* git checkout -b "xxx" 在已有项目上创建新的分支  git branch "xxx", git checkout "xxx"
	* git branch  获取分支列表
	* git branch "xxxx" 备份分支，不会切换分支
	* git branch -v  每一个分支的最后一次提交
	* git branch --merged 哪些分支已经合并到当前分支
	* git branch -d "xxx" 删除分支
	* git push origin --delete "xxxx" 删除远程分支
	* git push origin :"分支" 删除远程分支
	* git checkout -b "xxx" origin/"xxxx" 检出远程分支到本地

###### 储藏

通过储藏命令来存储当前修改，不提交，切换到其他分支

	* git stash save (-u 存储任何创建的未跟踪文件。默认值存储跟踪文件)
	* git stash apply 改动重新应用
	* 
	

# 问题

* windows使用git时出现：warning: LF will be replaced by CRLF
	$ rm -rf .git  // 删除.git  
	$ git config --global core.autocrlf false  //禁用自动转换
	// 然后重新执行
	$ git init    
	$ git add . 

* 在工程中很容易出现.gitignore并没有忽略掉我们已经添加的文件，那是因为.gitignore对已经追踪(track)的文件是无效的，需要清除缓存，清除缓存后文件将以未追踪的形式出现，这时重新添加(add)并提交(commit)就可以了。
	// 不要忘了后面的 . 
	git rm -r --cached .
	git add .
	git commit -m "comment
	
* git pull 的时候 出现了
		
		`
			error: You have not concluded your merge (MERGE_HEAD exists).
			hint: Please, commit your changes before merging.
			fatal: Exiting because of unfinished merge.
		`
		
本地有修改和提交，如何强制用远程的库更新更新。我尝试过用git pull -f，总是提示 You have not concluded your merge. (MERGE_HEAD exists)。

我需要放弃本地的修改，用远程的库的内容就可以，应该如何做？傻傻地办法就是用心的目录重新clone一个，正确的做法是什么？
		
解决
		
		`
			git fetch --all  获取远程所有修改
			git reset --hard origin/master 
			git fetch 只是下载远程的库的内容，不做任何的合并git reset 把HEAD指向刚刚下载的最新的版本
		`

	git clone -b 5005 http://git.xin.com/jinrong/fe.youxinjinrong.com.git origin/5005

	
## git 创建分支
git push  推送
git pull  下拉同步
 * git clone https://github.com/maxiong1/xiongye.git {将xiongye从github上下载到本地}
 * 进入xiongye目录
 * git branch {来查看分支}
 * git branch 分支  {来创建分支}
 * git checkout 分支 {进入此分支-切换分支}
 * 上面两个合成一个 git checkout －b 分支 
 * git push origin pp {将分支及分支文件推送到github仓库}

#### 在git pull的时候报错
 error: Your local changes to the following files would be overwritten by merge:
 
 解决办法：
 
			如果希望保留生产服务器上所做的改动,仅仅并入新配置项, 处理方法如下:
			git stash
			git pull
			git stash pop
			然后可以使用git diff -w +文件名 来确认代码自动合并的情况.
			
			如果希望用代码库中的文件完全覆盖本地工作版本. 方法如下:
			git reset --hard
			git pull
			其中git reset是针对版本
 		

##### 在git pull的时候出出现 Pull is not possible because you have unmerged files.

	解决：
	
	1.pull会使用git merge导致冲突，需要将冲突的文件resolve掉 git add -u, git commit之后才能成功pull.
	git push origin master
	
	2.如果想放弃本地的文件修改，可以使用git reset --hard FETCH_HEAD，FETCH_HEAD表示上一次成功git pull之后形成的commit点。然后git pull.
	注意：
	
	git merge会形成MERGE-HEAD(FETCH-HEAD) 。git push会形成HEAD这样的引用。HEAD代表本地最近成功push后形成的引用。



#### git回滚远程－－实战

  * git log 查看提交历史
  * git reset –soft 一窜字符窜
      * 撤销到某个版本之前，之前的修改退回到暂存区（不懂看漂亮的图哦~）。soft 和 hard参数的区别就是，hard修改记录都没了，soft则会保留修改记录。
  * git stash
      * 暂存为了安全起见。
  * git push -f
      * 将本地master push 到远程版本库中， -f 强制覆盖。 


#### fatal: HttpRequestException encountered解决方法

网上查了一下发现是Github 禁用了TLS v1.0 and v1.1，必须更新Windows的git凭证管理器，才行。或更新最新版本git
[https://github.com/Microsoft/Git-Credential-Manager-for-Windows](https://github.com/Microsoft/Git-Credential-Manager-for-Windows)

[https://github.com/Microsoft/Git-Credential-Manager-for-Windows/releases/tag/v1.14.0](https://github.com/Microsoft/Git-Credential-Manager-for-Windows/releases/tag/v1.14.0)


