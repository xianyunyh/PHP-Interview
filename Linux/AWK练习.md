## AWK题目练习

### awk工作原理

## AWK工作原理

- 第一步：执行BEGIN{action;… }语句块中的语句
- 第二步：从文件或标准输入(stdin)读取一行，然后执行pattern{action;… }语句块，它逐行扫描文件，从第 
  一行到最后一行重复这个过程，直到文件全部被读取完毕。
- 第三步：当读至输入流末尾时，执行END{action;…}语句块BEGIN语句块在awk开始从输入流中读取行之前被执行，这是一个可选的语句块，比如变量初始化、打印输出表格的表头等语句通常可以写在BEGIN语句块中END语句块在awk从输入流中读取完所有的行之后即被执行，比如打印所有行的分析结果这类信息汇总都是在END语句块中完成，它也是一个可选语句块pattern语句块中的通用命令是最重要的部分，也是可选的。如果没有提供pattern语句块，则默认执行{ print }，即打印每一个读取到的行， awk读取的每一行都会执行该语句块

### awk 内置变量

ARGC          命令行参数个数

ARGV          命令行参数排列

ENVIRON       支持队列中系统环境变量的使用

FILENAME      awk浏览文件名

FNR           浏览文件的记录数

FS            设置输入域分隔符，等价于命令行-F选项

NF            浏览记录的域个数

NR            已读的记录数

OFS           输出域分隔符

ORS           输出例句分隔符

RS            控制记录分隔符

1. 打印出/etc/passwd中个的第一个域，并在前面追加"账号"

```shell
cat /etc/passwd | awk -F ":" '{print "账号"$1}'
```

2. 打印出/etc/passwd 第三个域和第四个域 

```shell
cat /etc/passwd | awk -F ":" '{print $3,$4}'
```

3. 匹配/etc/passwd 第三域大于100的显示出完整信息 

```shell
cat /etc/passwd | awk -F ":" '{if($3 > 100) {print $0}}'
```

4. 打印行号小于15的，并且最后一域匹配bash的信息. 

NR表示行号。NF表示最后一个域 ~ 正则匹配符号。 // 正则表达式开始和结束符号

```shell
cat /etc/passwd | awk -F ":" '{if($NR < 15 && $NF~/bash/) {print $0}}'
```

5. 打印出第三域数字之和 

```SHELL
awk -F ":" 'BEGIN{sum =0} {sum = sum+$3} END {print sum}'
```

6. 请匹配passwd最后一段域bash结尾的信息，有多少条 

```shell
awk -F ":" '{if( $NF~/bash/) {i++}} END {print i }'
```

7. 请同时匹配passwd文件中，带mail和bash的关键字的信息 

```shell
cat /etc/passwd | awk -F ":" '{if( $NF~/bash/ || $NF~/mail/) {print $0}} '
```

8. 统计/etc/fstab文件中每个文件系统类型出现的次数

   /^UUID/：模式匹配以UUID开头的行 

    fs[$3]++：定义fs[]为关联数组下标是每条记录的第3个字段，数组的值是出现的次数  

   for(i in fs){print i,fs[i]}：在每条记录都处理完之后，用for循环遍历数组，打印下标（文件类型）和数组元素值（文件类型出现的次数） 

```shell
awk '/^UUID/{fs[$3]++}END{for(i in fs){print i,fs[i]}}' /etc/fstab
```

### nginx日志分析

日志格式

`'$remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent" "$http_x_forwarded_for"' `

**日志记录：**27.189.231.39 - - [09/Apr/2016:17:21:23 +0800] "GET /Public/index/images/icon_pre.png HTTP/1.1" 200 44668 "http://www.test.com/Public/index/css/global.css" "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36" "-" 

- 统计日志最多的10个IP

```shell
awk '{arr[$1]++} END {for(i in arr) {print arr[i]}}' access.log | sort -k1 -nr | head -n10
```

- 统计日志访问次数大于100次的IP

```shell
awk '{arr[$1]++} END{for (i in arr) {if(arr[i] > 100){print $i}}}' access.log
```

- 统计2016年4月9日内访问最多的10个ip

```shell
awk '$4>="[09/Apr/2016:00:00:00" && $4<="[09/Apr/2016:23:59:59" {arr[i]++} END{print arr[i]}' |sort -k1 -nr|head -n10
```

- 统计访问最多的十个页面

```shell
 awk '{a[$7]++}END{for(i in a)print a[i],i|"sort -k1 -nr|head -n10"}' access.log
```

- 统计访问状态为404的ip出现的次数

```shell
awk '{if($9~/404/)a[$1" "$9]++}END{for(i in a)print i,a[i]}' access.log
```

