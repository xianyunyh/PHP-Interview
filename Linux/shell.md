## shell 入门教程

> Linux 中的 shell 有多种类型，其中最常用的几种是 Bourne   shell（sh）、C   shell（csh）和 Korn   shell（ksh）。三种 shell 各有优缺点。> Bourne   Shell 是 UNIX 最初使用的 Shell，并且在每种 UNIX 上都可以使用。Bourne   Shell 在 Shell 编程方面相当优秀，但在处理与用户的交互方面做得不如其他几种 Shell。Linux 操作系统缺省的 Shell 是 Bourne   Again   Shell，它是 Bourne   Shell 的扩展，简称 Bash，与 Bourne   Shell 完全向后兼容，并且在 Bourne   Shell 的基础上增加、增强了很多特性。Bash 放在 /bin/bash 中，它有许多特色，可以提供如命令补全、命令编辑和命令历史表等功能，它还包含了很多 C   Shell 和 Korn   Shell 中的优点，有灵活和强大的编程接口，同时又有很友好的用户界面。可以使用 `Cat /etc/shells` 查看支持的 Shell 类型。我们最常用的就是 bash。兼容 sh

- 头声明

Shell 脚本第一行必须以 #！开头，它表示该脚本使用后面的解释器解释执行。```Shell
#!/bin/bash 
```

### Shell 变量

**Shell 变量中间不能有空格，合法的标识符（字母、数字、_）， 不能使用关键字。首字母必须是字母 **

** 变量赋值的时候，中间的等于号前后不能有空格 **。```Shell
name=11
Echo $name
1name // 错误
_name // 错误
name = "hello" // 错误
```

2. 使用变量

定义过的变量直接使用 $ 来访问这个变量


```Shell
name="Test"
Echo $name
Echo ${name}
```

3. 只读变量。在一个变量的前面加上 readonly 表示该变量只读。类似于常量。```
readonly Pi=3.14
Echo $Pi
```

4. 删除变量

当一个变量不再使用的时候，可以使用 unset 删除

```Shell
name="Test"
unset $name
```

变量的类型。有局部变量、环境变量、Shell 变量 


### 字符串

字符串和 PHP 类似。可以由双引号和单引号括起来

但是双引号括起来的字符串，里面的变量可以解析。单引号里面不能出现双引号（转义也不可以）. 所以尽量使用双引号

```Shell

str="hello''"
str2='hello'
str3='"Test"'// 错误
str4="str2$str2"
Echo $str4

```

- 字符串拼接

字符串拼接和其他的语言不一样。不需要。 也不需要 +
```Shell
name1="hello"
name2="world"

Echo $name1 $name2// hello world

```
- 获取字符串的长度

```Shell
str="helloworld"
${#str}

```

- 字符串切片

使用冒号：

```
str="helloworld"

Echo ${str:0:4} // 从 0 开始截取 4 个字符 Hell
```

- 字符串判断操作

```Shell
    ${Var}	变量 Var 的值， 与 $Var 相同
     	 
    ${Var-DEFAULT}	如果 Var 没有被声明， 那么就以 $DEFAULT 作为其值 *
    ${Var:-DEFAULT}	如果 Var 没有被声明， 或者其值为空， 那么就以 $DEFAULT 作为其值 *
     	 
    ${Var=DEFAULT}	如果 Var 没有被声明， 那么就以 $DEFAULT 作为其值 *
    ${Var:=DEFAULT}	如果 Var 没有被声明， 或者其值为空， 那么就以 $DEFAULT 作为其值 *
     	 
    ${Var+OTHER}	如果 Var 声明了， 那么其值就是 $OTHER, 否则就为 Null 字符串
    ${Var:+OTHER}	如果 Var 被设置了， 那么其值就是 $OTHER, 否则就为 Null 字符串
     	 
    ${Var?ERR_MSG}	如果 Var 没被声明， 那么就打印 $ERR_MSG *
    ${Var:?ERR_MSG}	如果 Var 没被设置， 那么就打印 $ERR_MSG *
     	 
    ${!varprefix*}	匹配之前所有以 varprefix 开头进行声明的变量
    ${!varprefix@}	匹配之前所有以 varprefix 开头进行声明的变量
    
```

- 字符串截取

```Shell
${#string}	$string 的长度
 	 
${string:position}	在 $string 中， 从位置 $position 开始提取子串
${string:position:length}	在 $string 中， 从位置 $position 开始提取长度为 $length 的子串
 	 
${string#substring}	从变量 $string 的开头， 删除最短匹配 $substring 的子串
${string##substring}	从变量 $string 的开头， 删除最长匹配 $substring 的子串
${string%substring}	从变量 $string 的结尾， 删除最短匹配 $substring 的子串
${string%%substring}	从变量 $string 的结尾， 删除最长匹配 $substring 的子串
 	 
${string/substring/replacement}	使用 $replacement, 来代替第一个匹配的 $substring
${string//substring/replacement}	使用 $replacement, 代替所有匹配的 $substring
${string/#substring/replacement}	如果 $string 的前缀匹配 $substring, 那么就用 $replacement 来代替匹配到的 $substring
${string/%substring/replacement}	如果 $string 的后缀匹配 $substring, 那么就用 $replacement 来代替匹配到的 $substring

例子

str="hello"

Echo ${#str}//5
Echo ${str:0:2} //He

Echo ${str/l/Test}//heltesto
Echo ${str//l/Test} //hetesttesto

```

### 数组

Shell 数组支持一维数组。和 PHP 类似。不需要指定数组的大小。数组用括号抱起来。每个元素用空格分割

arr=(A1 a2 a3)

```Shell
arr=(1 2 3)
${arr[0]}//1
```

- 获取数组所有的元素

使用 @ 或 * 可以获取数组中的所有元素

```Shell
${arr[*]}

```

- 获取数组的长度

```Shell
${#arr[*]}
```

- 遍历数组


```Shell

for a in ${arr[*]};do
    Echo $a
Done
```

- 数组第 n 个元素的长度


```Shell
${#arr[2]}
```

- 数组切片


```Shell
${arr[*]:0:2} //1 2
```

- 数组搜索替换


```Shell
${arr[*]/3/5}
```

- 添加元素到数组


```Shell
arr=("${arr[*]}"  "Test")
```
##  运算符

### 逻辑运算符

```Shell
&&	逻辑的 AND	[[$a -lt 100 && $b -gt 100]] 返回 false
||	逻辑的 OR	[[$a -lt 100 || $b -gt 100]] 返回 True
```

### 字符串比较

```Shell
=	检测两个字符串是否相等，相等返回 True。[$a = $b] 返回 false。!=	检测两个字符串是否相等，不相等返回 True。[$a != $b] 返回 True。-z	检测字符串长度是否为 0，为 0 返回 True。[-z $a] 返回 false。-n	检测字符串长度是否为 0，不为 0 返回 True。[-n $a] 返回 True。str	检测字符串是否为空，不为空返回 True。[$a] 返回 True。```
### 关系运算符

关系运算符只支持数字

```Shell
EQ	检测两个数是否相等，相等返回 True。[$a -EQ $b] 返回 false。-NE	检测两个数是否相等，不相等返回 True。[$a -NE $b] 返回 True。-gt	检测左边的数是否大于右边的，如果是，则返回 True。[$a -gt $b] 返回 false。-lt	检测左边的数是否小于右边的，如果是，则返回 True。[$a -lt $b] 返回 True。-Ge	检测左边的数是否大于等于右边的，如果是，则返回 True。[$a -Ge $b] 返回 false。-Le	检测左边的数是否小于等于右边的，如果是，则返回 True。[$a -Le $b] 返回 True。```
```Shell
a=10
b=20
if [[$a EQ $b]];Then
Echo "等于"
Fi
```

### 布尔运算符

```Shell
!	非运算，表达式为 True 则返回 false，否则返回 True。[! false] 返回 True。-o	或运算，有一个表达式为 True 则返回 True。[$a -lt 20 -o $b -gt 100] 返回 True。-a	与运算，两个表达式都为 True 才返回 True。[$a -lt 20 -a $b -gt 100] 返回 false。```

### 文件测试符号

```Shell
b File	检测文件是否是块设备文件，如果是，则返回 True。[-b $File] 返回 false。-c File	检测文件是否是字符设备文件，如果是，则返回 True。[-c $File] 返回 false。-d File	检测文件是否是目录，如果是，则返回 True。[-d $File] 返回 false。-f File	检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 True。[-f $File] 返回 True。-g File	检测文件是否设置了 SGID 位，如果是，则返回 True。[-g $File] 返回 false。-k File	检测文件是否设置了粘着位（Sticky Bit)，如果是，则返回 True。[-k $File] 返回 false。-p File	检测文件是否是有名管道，如果是，则返回 True。[-p $File] 返回 false。-u File	检测文件是否设置了 SUID 位，如果是，则返回 True。[-u $File] 返回 false。-r File	检测文件是否可读，如果是，则返回 True。[-r $File] 返回 True。-w File	检测文件是否可写，如果是，则返回 True。[-w $File] 返回 True。-x File	检测文件是否可执行，如果是，则返回 True。[-x $File] 返回 True。-s File	检测文件是否为空（文件大小是否大于 0），不为空返回 True。[-s $File] 返回 True。-e File	检测文件（包括目录）是否存在，如果是，则返回 True。[-e $File] 返回 True。```

```Shell
File=""
if [[-f $File]]; Then
    Echo "IS a File"
Fi
```
## 流程控制

### if/else

```Shell
if [[condition]];Then
	Echo '1'
Fi

//if else

if [[condition]]; Then
Echo '1'
else
Echo '2'
Fi

# if elseif else

if [[condition]];Then

elif [[condition]];Then

Fi
```

### for

```Shell

for i in List1 List2 ;do
    Echo $i
Done

for i in 1 2 3 4;do

    Echo $i
Done
//1 2 3 4

for ((i = 0; i < 10; i++)); do
	Echo $i
Done
```

###  while


```Shell
while [[condition]]; do
	#statements
Done
```

**demo 例子 **

```Shell
#! /bin/bash

a=10
b=20

# 判断数值
if [[$a -NE $b]]; Then
    Echo "a 不等于 b"
Fi

# 判断字符串
if [['$a' != '$b']]; Then
    Echo "1"
Fi

# 判断文件

if [[-d "../Doc"]]; Then
    Echo "dirctory"
Fi

if [[! -f "../routes"]]; Then
    Echo "NOT a File"
Fi


#while
while [[$a -gt 1]]; do
    #statements
    Echo $a;
    # 条件
    let a--
Done

# for

for i in "wo" "rds"; do
    Echo $i
Done
```
## 函数

Shell 中的函数 定义如下


```Shell
其中 function 是可以省略的
[function] functionName(){}

function Test(){}

Test(){}

```

- 函数的调用


函数的调用和其他语言的调用不太一样


```Shell
function Test()
{Echo "hello"}

Test #调用函数

```

- 函数的参数


函数的参数定义不需要在 () 中定义形参 只需要在调用使用传入即可

`$n n 代表整数 ` $1 是第一个参数 以此类推
```Shell
function Test()
{Echo $1 # 第一个参数 以此类推}

Test 22 //22
```
## 引入外部文件

在 Shell 中有时候需要引入外部的脚本文件 我们需要使用下面的两种方式


1.  .    filename

```Shell
. ./a.sh
```

2. source filename

在文件中使用 source


```Shell
source  ./a.sh
```
## 命令行接收参数

在执行 Shell 脚本时，向脚本传递参数，脚本内获取参数的格式为：$n。n 代表一个数字，1 为执行脚本的第一个参数，2 为执行脚本的第二个参数。```Shell
$ bash test.sh Test Test2
  $0 代表脚本文件 //test.sh
  $1 代表第一个参数 //Test
  $# 参数的个数 // 2
  $* 所有参数 

for i in  $*; do
	Echo $i
Done

$$ 脚本运行的进程号

$! 最后一个进程号
$? 最后退出的状态 0 表示没有问题

```