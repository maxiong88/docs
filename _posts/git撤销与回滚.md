---
title: git撤销与回滚
date: 2018-03-28 17:57:51
tags: git
---

开发过程中，你肯定会遇到这样的场景：

* 糟了，我刚把不想要的代码，commit到本地仓库中了，但是还没有做push操作！
* 彻底完了，刚线上更新的代码出现问题了，需要还原这次提交的代码！
* 刚才我发现之前的某次提交太愚蠢了，现在想要干掉它！

<!-- more -->

# 	回滚

	一、本地回滚，强推
	
	git reset --hard commitID 回退到某个版本号 
	
	弊端:
		该commitID之后的提交都会删除,即，`仓库中`
		使用git log --pertty=oneline只能查看到之前的commit不会看到之后commit。
		使用git log -g (git reflog)可查看之后的commit。
		
		`
		error: failed to push some refs to 'https://github.com/maxiong1/test.git'
		hint: Updates were rejected because the tip of your current branch is behind
		hint: its remote counterpart. Integrate the remote changes (e.g.
		hint: 'git pull ...') before pushing again.
		hint: See the 'Note about fast-forwards' in 'git push --help' for details.
		`
		
	git push -u origin master -f 强推 (可能会出现无权限的问题，只要去setting->protected_branches关闭分支保护即可,===这是不行的====) 
	git reset --hard这个命令整过之后呢，就如你自己执行delete命令一样，再也尸骨难寻啦（也就是真的毛都不剩了！！默哀三秒）！！！！
	
	二、 撤销某次操作，push
	
	git revert 撤销 某次操作，此次操作之前和之后的commit和history都会保留，并且把这次撤销作为一次最新的提交
		
	git revert HEAD 撤销前一次commit
	git revert HEAD^ 撤销前前一次
	git revert commit 撤销指定commit
	
	git revert是提交一个新的版本，将需要revert的版本的内容再反向修改回去，版本会递增，不影响之前提交的内容

	* revert merge会出现的问题
	`
	$ git revert 6d55e80a8580d283036122d16b33205119ad1171
	error: commit 6d55e80a8580d283036122d16b33205119ad1171 is a merge but no -m option was given.
	fatal: revert failed

	`
	
	这是因为你revert的那个commit是一个merge commit，它有两个parent, Git不知道base是选哪个parent，就没法diff，所以就抱怨了，所以你要显示告诉Git用哪一个parent。
	
	-m option(分类 1谁 合并了2谁)
	
	`
	$ git revert 6d55e80a8580d283036122d16b33205119ad1171 -m 2
	[master 2338121] Revert "Merge branch 'master' into dev"
	 3 files changed, 3 deletions(-)
	 delete mode 100644 a1.txt
	 delete mode 100644 a2.txt
	 delete mode 100644 a3.txt
	`
	
	这样就还原了原来的master；
	如果revert错了，使用git revert  HEAD即可还原