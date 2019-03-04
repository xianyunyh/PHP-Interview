在 linux 终端，面对命令不知道怎么用，或不记得命令的拼写及参数时，我们需要求助于系统的帮助文档；linux 系统内置的帮助文档很详细，通常能解决我们的问题，我们需要掌握如何正确的去使用它们；比如可是使用 --help 查看帮助选项。如 `ls --help`

## 文件和目录管理

### 创建和删除

- 创建：mkdir
- 删除：rm
- 删除非空目录：rm -rf file 目录
- 删除日志 rm *log (等价： $find ./ -name“*log”-exec rm {} ;)
- 移动：mv
- 复制：cp (复制目录：cp -r)
- 创建文件 touch

### 查看

- 显示当前目录下的文件 **ls**
- 按时间排序，以列表的方式显示目录项 **ls -lrt**

```shell
ls -l
```

- 查看文件内容 cat  可以加 more、less 控制输出的内容的大小

```shell
cat a.text
cat a.text | more
cat a.text| less
```

### 权限

- 改变文件的拥有者 chown
- 改变文件读、写、执行等属性 chmod
- 递归子目录修改：chown -R tuxapp source/
- 增加脚本可执行权限：chmod a+x myscript

### 管道和重定向

- 批处理命令连接执行，使用 |
- 串联： 使用分号 ;
- 前面成功，则执行后面一条，否则，不执行：&&
- 前面失败，则后一条执行： ||

```shell
ls /proc && echo  suss! || echo failed.
```

## 文本处理

### 文件查找 find

find 参数很多，本文只介绍几个常用的

-name  按名字查找

-type 按类型

-atime 访问时间

```shell
find . -atime 7 -type f -print
find . -type d -print  // 只列出所有目录
find / -name "hello.c" 查找 hello.c 文件
```


### 文本查找 grep

```
grep match_patten file // 默认访问匹配行
```

常用参数

- -o 只输出匹配的文本行 **VS** -v 只输出没有匹配的文本行

- -c 统计文件中包含文本的次数

  `grep -c“text”filename`

- -n 打印匹配的行号

- -i 搜索时忽略大小写

- -l 只打印文件名

```shell
grep "class" . -R -n # 在多级目录中对文本递归搜索 ( 程序员搜代码的最爱）cat LOG.* | tr a-z A-Z | grep "FROM" | grep "WHERE" > b #将日志中的所有带 where 条件的 SQL 查找查找出来
```

### 文本替换 sed

```Shell
sed [options] 'command' File(s)
```

- 首处替换

```
sed 's/text/replace_text/' File   // 替换每一行的第一处匹配的 text
```

- 全局替换

```
sed 's/text/replace_text/g' File
```

默认替换后，输出替换后的内容，如果需要直接替换原文件， 使用 -i:

```
sed -i 's/text/repalce_text/g' File
```

- 移除空白行

```
sed '/^$/d' File
```

```Shell
sed 's/book/books/' File #替换文本中的字符串：sed 's/book/books/g' File
sed '/^$/d' File #删除空白行
```

### 数据流处理 awk

详细教程可以查看 HTTP://awk.readthedocs.io/EN/latest/chapter-one.html

```Shell
awk 'BEGIN{statements} statements2 END{statements}'
```

工作流程

1. 执行 begin 中语句块；2. 从文件或 stdin 中读入一行，然后执行 statements2，重复这个过程，直到文件全部被读取完毕；3. 执行 end 语句块；** 特殊变量 **

NR: 表示记录数量，在执行过程中对应当前行号；NF: 表示字段数量，在执行过程总对应当前行的字段数；$0: 这个变量包含执行过程中当前行的文本内容；$1: 第一个字段的文本内容；$2: 第二个字段的文本内容；```Shell
awk '{print $2, $3}' File
# 日志格式：'$remote_addr - $remote_user [$time_local]"$request"$status $Body_bytes_sent"$HTTP_referer""$HTTP_user_agent" "$HTTP_x_forwarded_for"'
#统计日志中访问最多的 10 个 Ip
awk '{a[$1]++}END{for(i in a)print a[i],i|"sort -k1 -nr|Head -n10"}' access.log

```

### 排序 sort

- -n 按数字进行排序 VS -d 按字典序进行排序
- -r 逆序排序
- -k N 指定按第 N 列排序

```Shell
sort -nrk 1 data.txt
sort -BD data // 忽略像空格之类的前导空白字符
```

### 去重 uniq

- 消除重复行

```
sort unsort.txt | uniq
```

### 统计 wc

```Shell
wc -l File // 统计行数
wc -w File // 统计单词数
wc -c File // 统计字符数
```

