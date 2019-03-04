## AWK 题目练习

### awk 工作原理

## AWK 工作原理

- 第一步：执行 BEGIN{action;……}语句块中的语句
- 第二步：从文件或标准输入 (stdin) 读取一行，然后执行 pattern{action;……}语句块，它逐行扫描文件，从第 
  一行到最后一行重复这个过程，直到文件全部被读取完毕。- 第三步：当读至输入流末尾时，执行 END{action;……}语句块 BEGIN 语句块在 awk 开始从输入流中读取行之前被执行，这是一个可选的语句块，比如变量初始化、打印输出表格的表头等语句通常可以写在 BEGIN 语句块中 END 语句块在 awk 从输入流中读取完所有的行之后即被执行，比如打印所有行的分析结果这类信息汇总都是在 END 语句块中完成，它也是一个可选语句块 pattern 语句块中的通用命令是最重要的部分，也是可选的。如果没有提供 pattern 语句块，则默认执行{print}，即打印每一个读取到的行，awk 读取的每一行都会执行该语句块

### awk 内置变量

ARGC          命令行参数个数

ARGV          命令行参数排列

ENVIRON       支持队列中系统环境变量的使用

FILENAME      awk 浏览文件名

FNR           浏览文件的记录数

FS            设置输入域分隔符，等价于命令行 - F 选项

NF            浏览记录的域个数

NR            已读的记录数

OFS           输出域分隔符

ORS           输出例句分隔符

RS            控制记录分隔符

1. 打印出 /etc/passwd 中个的第一个域，并在前面追加 "账号"

```shell
cat /etc/passwd | awk -F ":" '{print" 账号 "$1}'
```

2. 打印出 /etc/passwd 第三个域和第四个域 

```shell
cat /etc/passwd | awk -F ":" '{print $3,$4}'
```

3. 匹配 /etc/passwd 第三域大于 100 的显示出完整信息 

```shell
cat /etc/passwd | awk -F ":" '{if($3> 100) {print $0}}'
```

4. 打印行号小于 15 的，并且最后一域匹配 bash 的信息。 

NR 表示行号。NF 表示最后一个域 ~ 正则匹配符号。// 正则表达式开始和结束符号

```Shell
Cat /etc/passwd | awk -F ":" '{if($NR < 15 && $NF~/bash/) {print $0}}'
```

5. 打印出第三域数字之和 

```SHELL
awk -F ":" 'BEGIN{sum =0} {sum = sum+$3} END {print sum}'
```

6. 请匹配 passwd 最后一段域 bash 结尾的信息，有多少条 

```shell
awk -F ":" '{if( $NF~/bash/) {i++}} END {print i}'
```

7. 请同时匹配 passwd 文件中，带 mail 和 bash 的关键字的信息 

```shell
cat /etc/passwd | awk -F ":" '{if( $NF~/bash/ || $NF~/mail/) {print $0}}'
```

8. 统计 /etc/fstab 文件中每个文件系统类型出现的次数

   /^UUID/：模式匹配以 UUID 开头的行 

    fs[$3]++：定义 fs[]为关联数组下标是每条记录的第 3 个字段，数组的值是出现的次数  

   for(i in fs){print i,fs[i]}：在每条记录都处理完之后，用 for 循环遍历数组，打印下标（文件类型）和数组元素值（文件类型出现的次数）```shell
awk '/^UUID/{fs[$3]++}END{for(i in fs){print i,fs[i]}}' /etc/fstab
```

### nginx 日志分析

日志格式

`'$remote_addr - $remote_user [$time_local]"$request"$status $body_bytes_sent"$http_referer""$http_user_agent" "$http_x_forwarded_for"' `

** 日志记录：**27.189.231.39 - - [09/Apr/2016:17:21:23 +0800] "GET /Public/index/images/icon_pre.png HTTP/1.1" 200 44668 "http://www.test.com/Public/index/css/global.css" "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36" "-" 

- 统计日志最多的 10 个 IP

```shell
awk '{arr[$1]++} END {for(i in arr) {print arr[i]}}' access.log | sort -k1 -nr | head -n10
```

- 统计日志访问次数大于 100 次的 IP

```shell
awk '{arr[$1]++} END{for (i in arr) {if(arr[i] > 100){print $i}}}' access.log
```

- 统计 2016 年 4 月 9 日内访问最多的 10 个 ip

```shell
awk '$4>="[09/Apr/2016:00:00:00"&& $4<="[09/Apr/2016:23:59:59"{arr[i]++} END{print arr[i]}' |sort -k1 -nr|Head -n10
```

- 统计访问最多的十个页面

```Shell
 awk '{a[$7]++}END{for(i in a)print a[i],i|"sort -k1 -nr|Head -n10"}' access.log
```

- 统计访问状态为 404 的 Ip 出现的次数

```Shell
awk '{if($9~/404/)a[$1" "$9]++}END{for(i in a)print i,a[i]}' access.log
```

