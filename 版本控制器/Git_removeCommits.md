在 Git 开发中通常会控制主干分支的质量，但有时还是会把错误的代码合入到远程主干。 虽然可以 直接回滚远程分支](https://harttle.land/2018/03/12/reset-origin-without-force-push.html)， 但有时新的代码也已经合入，直接回滚后最近的提交都要重新操作。 那么有没有只移除某些 Commit 的方式呢？可以一次 [revert](https://git-scm.com/docs/git-revert) 操作来完成。

# 一个例子

考虑这个例子，我们提交了 6 个版本，其中 3-4 包含了错误的代码需要被回滚掉。 同时希望不影响到后续的 5-6。

```
* 982d4f6 (HEAD -> master) version 6
* 54cc9dc version 5
* 551c408 version 4, harttle screwed it up again
* 7e345c9 version 3, harttle screwed it up
* f7742cd version 2
* 6c4db3f version 1
```

这种情况在团队协作的开发中会很常见：可能是流程或认为原因不小心合入了错误的代码， 也可能是合入一段时间后才发现存在问题。 总之已经存在后续提交，使得直接回滚不太现实。

下面的部分就开始介绍具体操作了，同时我们假设远程分支是受保护的（不允许 Force Push）。 思路是从产生一个新的 Commit 撤销之前的错误提交。

# git revert

使用 `git revert <commit>` 可以撤销指定的提交， 要撤销一串提交可以用 `<commit1>..<commit2>` 语法。 注意这是一个前开后闭区间，即不包括 commit1，但包括 commit2。

```
git revert --no-commit f7742cd..551c408
git commit -a -m 'This reverts commit 7e345c9 and 551c408'
```

其中 `f7742cd` 是 version 2，`551c408` 是 version 4，这样被移除的是 version 3 和 version 4。 注意 revert 命令会对每个撤销的 commit 进行一次提交，`--no-commit` 后可以最后一起手动提交。

此时 Git 记录是这样的：

```
* 8fef80a (HEAD -> master) This reverts commit 7e345c9 and 551c408
* 982d4f6 version 6
* 54cc9dc version 5
* 551c408 version 4, harttle screwed it up again
* 7e345c9 version 3, harttle screwed it up
* f7742cd version 2
* 6c4db3f version 1
```

现在的 HEAD（`8fef80a`）就是我们想要的版本，把它 Push 到远程即可。

# 确认 diff

如果你像不确定是否符合预期，毕竟批量干掉了别人一堆 Commit，可以做一下 diff 来确认。 首先产生 version 4（`551c408`）与 version 6（`982d4f6`）的 diff，这些是我们想要保留的：

```
git diff 551c408..982d4f6
```

然后再产生 version 2（`f7742cd`）与当前状态（HEAD）的 diff：

```
git diff f7742cd..HEAD
```

如果 version 3, version 4 都被 version 6 撤销的话，上述两个 diff 为空。 可以人工确认一下，或者 grep 掉 description 之后做一次 diff。 下面介绍的另一种方法可以容易地确认 diff。

# 另外一种方式

类似 [安全回滚远程分支](https://harttle.land/2018/03/12/reset-origin-without-force-push.html)， 我们先回到 version 2，让它合并 version 4 同时代码不变， 再合并 version 5, version 6。

```
# 从 version 2 切分支出来
git checkout -b fixing f7742cd
# 合并 version 4，保持代码不变
git merge -s ours 551c408
# 合并 version 5, version 6
git merge master
```

上述分支操作可以从 [分支管理](https://harttle.land/2016/09/02/git-workflow-branch.html) 一文了解。 至此，`fixing` 分支已经移除了 version 3 和 version 4 的代码，图示如下：

```
*   3cb9f8a (HEAD -> v2) Merge branch 'master' into v2
|\
| * 982d4f6 (master) version 6
| * 54cc9dc version 5
* |   c669557 Merge commit '551c408' into v2
|\ \
| |/
| * 551c408 version 4, harttle screwed it up again
| * 7e345c9 version 3, harttle screwed it up
|/
* f7742cd version 2
* 6c4db3f version 1
```

可以简单 diff 一下来确认效果：

```
# 第一次 merge 结果与 version 2 的 diff，应为空
git diff f7742cd..c669557
# 第二次 merge 的内容，应包含 version 5 和 version 6 的改动
git diff c669557..3cb9f8a
```

现在的 `HEAD`（即 `fixing` 分支）就是我们想要的版本，可以把它 Push 到远程了。 注意由于现在处于 `fixing` 分支， 需要 [Push 时指定远程分支](https://harttle.land/2016/09/05/git-workflow-remote.html) 为 `master`。
