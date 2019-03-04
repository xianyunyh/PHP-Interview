## crontab  定时任务

通过 crontab 命令，我们可以在固定的间隔时间执行指定的系统指令或 Shell script 脚本。时间间隔的单位可以是分钟、小时、日、月、周及以上的任意组合。这个命令非常适合周期性的日志分析或数据备份等工作。## crontab 的文件格式

分 时 日 月 星期 要运行的命令

- 第 1 列分钟 0～59
- 第 2 列小时 0～23（0 表示子夜）- 第 3 列日 1～31
- 第 4 列月 1～12
- 第 5 列星期 0～7（0 和 7 表示星期天）- 第 6 列要运行的命令

![crontab](crontab.png)

### 实例

```Shell
* * * * * Echo "hello" #每 1 分钟执行 hello
3,15 * * * * myCommand #每小时第三分钟和第十五分钟执行
3,15 8-11 * * * myCommand# 在上午 8 点到 11 点的第 3 和第 15 分钟执行
3,15 8-11 */2  *  * myCommand #每隔两天的上午 8 点到 11 点的第 3 和第 15 分钟执行
30 21 * * * /etc/init.d/SMB restart #每晚的 21:30 重启 SMB
0 23 * * 6 /etc/init.d/SMB restart #每星期六的晚上 11 : 00 pm 重启 SMB
```

** 注意事项 **

新创建的 Cron Job，不会马上执行，至少要过 2 分钟才执行。如果重启 Cron 则马上执行。当 crontab 失效时，可以尝试 /etc/init.d/crond restart 解决问题。或者查看日志看某个 Job 有没有执行 / 报错 Tail -f /Var/log/Cron。```
$service Cron restart
```
