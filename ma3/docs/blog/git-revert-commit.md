---
title: 'git---revert/commit'
description: 'git 回滚/多个commit记录合并'
sidebar: 'auto'
time: '2019-12-01'
prev: ''
next: ''
---


## 回滚

### git revert -n

+ git revert -n [commit]
+ 解决冲突
+ git revert --continue
+ git push

### git revert

+ git revert [commit]
+ 解决冲突
+ git push

### pull requests /merge requests

+ 本地分支开发，提交到仓库分支
+ 在仓库分支创建 `pull requests/ merge requests`
+ 审核代码，合并master
+ 如果想要回滚，可进入`pull requests/merge resuqests`中点击 `revert` 按钮即可


想要撤消 `git revert` 使用 `git reset --hard [commit]`

如果遇到 `Merge branch ` 的记录，使用`git revert ` 会出现

``` js
error: commit xxxxxx is a merge but no -m option was given.
fatal: revert failed

// 使用 git revert [commit] -m [1|2]

```


## 合并多个commit


git worktree add 本地文件 远程分支名

## ls-remote -h -t git://github.com/adobe-webplatform/eve.git

解决方法：
git config --global url."https://".insteadOf git://



+ [https://www.cnblogs.com/bellkosmos/p/11409904.html](https://www.cnblogs.com/bellkosmos/p/11409904.html)