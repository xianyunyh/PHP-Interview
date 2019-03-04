# Git

- 创建 git 仓库

当前目录下多了一个。git 的目录，这个目录是 Git 来跟踪管理版本库的

```
git init  
```

- 工作区状态

```
git status // 查看状态
git diff // 比较差异
```

- 版本回退

Head 指向的版本就是当前版本，因此，Git 允许我们在版本的历史之间穿梭
```
git log // 查看提交的记录
git reflog // 查看命令操作的记录
git reset --Hard Head// 回退到 Head 的工作区
```

- 工作区、暂存区

工作区就是当前操作的目录。当你使用 git add 的时候就是把文件加到暂存区。commit 之后就是把暂存区的文件提交到分支中

版本库记录着差异。![image](https://www.liaoxuefeng.com/files/attachments/001384907720458e56751DF1C474485b697575073C40AE9000/0)

- 撤销修改

命令 git checkout -- readme.txt 意思就是，把 readme.txt 文件在工作区的修改全部撤销，这里有两种情况：一种是 readme.txt 自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；一种是 readme.txt 已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。用命令

```
git reset Head File
```
可以把暂存区的修改撤销掉（unstage），重新放回工作区。使用 Head 表示最新的状态

- 删除文件


使用 git RM File 可以删除版本库中的文件

```
git RM read.txt

git checkout -- read.txt // 从版本库中恢复

```

- 远程仓库

添加远程仓库

origin 是仓库名字。是 git 的默认的 
```
git remote  add origin 仓库地址
git remote -v 查看远程仓库
git push -u origin Master // 将本地 Master 和 orgin 分支关联。git clone 仓库地址 //clone 一个远程仓库到本地
git checkout -b Branch-name origin/Branch-name，// 本地和远程分支的名称最好一致
git Branch --Set-upstream Branch-name origin/Branch-name // 建立本地分支和远程分支的关联，git pull  orgin Master // 从远程分支抓取
```

## git 分支

Master 是 git 默认的分支，也叫主分支。每一次提交在分支上形成了一个时间线。Head 指向该分支

![image](https://www.liaoxuefeng.com/files/attachments/001384908811773187a597e2d844eefb11f5CF5d56135CA000/0)

- 创建分支

```
git Branch Dev // 创建分支
git checkout Dev // 切换分支
git Branch  // 命令会列出所有分支
git checkout -b Dev // 创建并切换到 Dev 分支
```
Head 指针指向了 Dev
![image](https://www.liaoxuefeng.com/files/attachments/00138490883510324231A837e5d4aee844d3e4692BA50f5000/0)

- 合并分支

合并某分支到当前分支：git merge <name>
```
git checkout Master 
git merge Dev
```

- 删除分支

```
git Branch -d Dev
git Branch -D <name> // 强行删除

```

## 工作区暂存

将工作区暂时保存起来 不提交到暂存区。```
git stash // 保存工作区

git stash List // 查看保存的工作区
git stash POP
git stash apply // 恢复保存的工作区
git stach drop // 删除保存的工作区
```

## tag 标签

```
git tag v1.0 // 打标签
git tag  // 列出所有的标签
git tag commit_ID // 给特定的 commit_ID 打标签
git tag -a v1.0 -m "tag1" // 打带说明的标签
```

- 操作标签

  - 删除标签

```
git tag -d v1.0
```
- 推送标签到远程分支

```
git push orgin v1.0
git push origin --tags// 推送所有的标签到远程分支
git push origin :refs/tags/v0.9 // 删除远程分支的标签
```
### 配置 git

初次使用 需要配置自己的信息，```
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```


- 配置忽略文件

.gitignore 文件本身要放到版本库里，并且可以对。gitignore 做版本管理！忽略文件的原则是：1. 忽略操作系统自动生成的文件，比如缩略图等；2.、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如 Java 编译产生的。class 文件

3. 忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。- 设置别名 

别名就是把一些复杂的命令简化 类似 SVN co 等之类的

```Shell
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.br Branch
git config --global alias.unstage 'reset Head'
git config --global alias.last 'log -1'
git config --global alias.lg "log --color --graph --Pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%CR) %C(Bold Blue)<%an>%Creset'--abbrev-commit"
```

- 当前项目配置

每个仓库的 Git 配置文件都放在。git/config 文件中：```ini
[Core]
    repositoryformatversion = 0
    filemode = True
    Bare = false
    logallrefupdates = True
    ignorecase = True
    precomposeunicode = True
[remote "origin"]
    url = git@github.com:xianyunyh/PHP-Interview
    fetch = +refs/heads/*:refs/remotes/origin/*
[Branch "Master"]
    remote = origin
    merge = refs/heads/Master
[alias]
    last = log -1
```

当前用户的 Git 配置文件放在用户主目录下的一个隐藏文件。gitconfig 中

```ini
[alias]
    co = checkout
    ci = commit
    BR = Branch
    ST = status
[user]
    name = Your Name
    email = your@email.com
```
