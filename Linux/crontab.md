## crontab  定时任务

通过crontab 命令，我们可以在固定的间隔时间执行指定的系统指令或 shell script脚本。时间间隔的单位可以是分钟、小时、日、月、周及以上的任意组合。这个命令非常适合周期性的日志分析或数据备份等工作。

## crontab的文件格式

分 时 日 月 星期 要运行的命令

- 第1列分钟0～59
- 第2列小时0～23（0表示子夜）
- 第3列日1～31
- 第4列月1～12
- 第5列星期0～7（0和7表示星期天）
- 第6列要运行的命令

![crontab](crontab.png)

### 实例

```shell
* * * * * echo "hello" #每1分钟执行hello
3,15 * * * * myCommand #每小时第三分钟和第五分钟执行
3,15 8-11 * * * myCommand# 在上午8点到11点的第3和第15分钟执行
3,15 8-11 */2  *  * myCommand #每隔两天的上午8点到11点的第3和第15分钟执行
30 21 * * * /etc/init.d/smb restart #每晚的21:30重启smb
0 23 * * 6 /etc/init.d/smb restart #每星期六的晚上11 : 00 pm重启smb
```

**注意事项**

新创建的cron job，不会马上执行，至少要过2分钟才执行。如果重启cron则马上执行。

当crontab失效时，可以尝试/etc/init.d/crond restart解决问题。或者查看日志看某个job有没有执行/报错tail -f /var/log/cron。

```
$service cron restart
```