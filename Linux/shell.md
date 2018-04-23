## shell入门教程

> Linux中的shell有多种类型，其中最常用的几种是Bourne   shell（sh）、C   shell（csh）和Korn   shell（ksh）。三种shell各有优缺点。
> Bourne   shell是UNIX最初使用的shell，并且在每种UNIX上都可以使用。Bourne   shell在shell编程方面相当优秀，但在处理与用户的交互方面做得不如其他几种shell。Linux操作系统缺省的shell是Bourne   Again   shell，它是Bourne   shell的扩展，简称Bash，与Bourne   shell完全向后兼容，并且在Bourne   shell的基础上增加、增强了很多特性。Bash放在/bin/bash中，它有许多特色，可以提供如命令补全、命令编辑和命令历史表等功能，它还包含了很多C   shell和Korn   shell中的优点，有灵活和强大的编程接口，同时又有很友好的用户界面。

可以使用 `cat /etc/shells` 查看支持的shell类型。我们最常用的就是bash。兼容sh

- 头声明

shell脚本第一行必须以 #！开头，它表示该脚本使用后面的解释器解释执行。

```shell
#!/bin/bash 
```

### shell变量

**shell变量中间不能有空格，合法的标识符（字母、数字、_）,不能使用关键字。首字母必须是字母**

**变量赋值的时候，中间的等于号前后不能有空格**。

```shell
name=11
echo $name
1name //错误
_name //错误
name = "hello" //错误
```

2. 使用变量

定义过的变量直接使用$来访问这个变量


```shell
name="test"
echo $name
echo ${name}
```

3. 只读变量。

在一个变量的前面加上readonly 表示该变量只读。类似于常量。

```
readonly PI=3.14
echo $PI
```

4. 删除变量

当一个变量不再使用的时候，可以使用unset删除

```shell
name="test"
unset $name
```

变量的类型。有局部变量、环境变量、shell变量 


### 字符串

字符串和php类似。可以由双引号和单引号括起来

但是双引号括起来的字符串，里面的变量可以解析。

单引号里面不能出现双引号(转义也不可以).所以尽量使用双引号

```shell

str="hello''"
str2='hello'
str3='"test"'//错误
str4="str2$str2"
echo $str4

```

- 字符串拼接

字符串拼接和其他的语言不一样。不需要.也不需要+
```shell
name1="hello"
name2="world"

echo $name1 $name2// hello world

```
- 获取字符串的长度

```shell
str="helloworld"
${#str}

```

- 字符串切片

使用冒号:

```
str="helloworld"

echo ${str:0:4} //从0开始截取4个字符 hell
```

- 字符串判断操作

```shell
    ${var}	变量var的值, 与$var相同
     	 
    ${var-DEFAULT}	如果var没有被声明, 那么就以$DEFAULT作为其值 *
    ${var:-DEFAULT}	如果var没有被声明, 或者其值为空, 那么就以$DEFAULT作为其值 *
     	 
    ${var=DEFAULT}	如果var没有被声明, 那么就以$DEFAULT作为其值 *
    ${var:=DEFAULT}	如果var没有被声明, 或者其值为空, 那么就以$DEFAULT作为其值 *
     	 
    ${var+OTHER}	如果var声明了, 那么其值就是$OTHER, 否则就为null字符串
    ${var:+OTHER}	如果var被设置了, 那么其值就是$OTHER, 否则就为null字符串
     	 
    ${var?ERR_MSG}	如果var没被声明, 那么就打印$ERR_MSG *
    ${var:?ERR_MSG}	如果var没被设置, 那么就打印$ERR_MSG *
     	 
    ${!varprefix*}	匹配之前所有以varprefix开头进行声明的变量
    ${!varprefix@}	匹配之前所有以varprefix开头进行声明的变量
    
```

- 字符串截取

```shell
${#string}	$string的长度
 	 
${string:position}	在$string中, 从位置$position开始提取子串
${string:position:length}	在$string中, 从位置$position开始提取长度为$length的子串
 	 
${string#substring}	从变量$string的开头, 删除最短匹配$substring的子串
${string##substring}	从变量$string的开头, 删除最长匹配$substring的子串
${string%substring}	从变量$string的结尾, 删除最短匹配$substring的子串
${string%%substring}	从变量$string的结尾, 删除最长匹配$substring的子串
 	 
${string/substring/replacement}	使用$replacement, 来代替第一个匹配的$substring
${string//substring/replacement}	使用$replacement, 代替所有匹配的$substring
${string/#substring/replacement}	如果$string的前缀匹配$substring, 那么就用$replacement来代替匹配到的$substring
${string/%substring/replacement}	如果$string的后缀匹配$substring, 那么就用$replacement来代替匹配到的$substring

例子

str="hello"

echo ${#str}//5
echo ${str:0:2} //he

echo ${str/l/test}//heltesto
echo ${str//l/test} //hetesttesto

```

### 数组

shell数组支持一维数组。和php类似。不需要指定数组的大小。

数组用括号抱起来。每个元素用空格分割

arr=(a1 a2 a3)

```shell
arr=(1 2 3)
${arr[0]}//1
```

- 获取数组所有的元素

使用@ 或 * 可以获取数组中的所有元素

```shell
${arr[*]}

```

- 获取数组的长度

```shell
${#arr[*]}
```

- 遍历数组


```shell

for a in ${arr[*]};do
    echo $a
done
```

- 数组第n个元素的长度


```shell
${#arr[2]}
```

- 数组切片


```shell
${arr[*]:0:2} //1 2
```

- 数组搜索替换


```shell
${arr[*]/3/5}
```

- 添加元素到数组


```shell
arr=("${arr[*]}"  "test")
```
##  运算符

### 逻辑运算符

```shell
&&	逻辑的 AND	[[ $a -lt 100 && $b -gt 100 ]] 返回 false
||	逻辑的 OR	[[ $a -lt 100 || $b -gt 100 ]] 返回 true
```

### 字符串比较

```shell
=	检测两个字符串是否相等，相等返回 true。	[ $a = $b ] 返回 false。
!=	检测两个字符串是否相等，不相等返回 true。	[ $a != $b ] 返回 true。
-z	检测字符串长度是否为0，为0返回 true。	[ -z $a ] 返回 false。
-n	检测字符串长度是否为0，不为0返回 true。	[ -n $a ] 返回 true。
str	检测字符串是否为空，不为空返回 true。	[ $a ] 返回 true。
```
### 关系运算符

关系运算符只支持数字

```shell
eq	检测两个数是否相等，相等返回 true。	[ $a -eq $b ] 返回 false。
-ne	检测两个数是否相等，不相等返回 true。	[ $a -ne $b ] 返回 true。
-gt	检测左边的数是否大于右边的，如果是，则返回 true。	[ $a -gt $b ] 返回 false。
-lt	检测左边的数是否小于右边的，如果是，则返回 true。	[ $a -lt $b ] 返回 true。
-ge	检测左边的数是否大于等于右边的，如果是，则返回 true。	[ $a -ge $b ] 返回 false。
-le	检测左边的数是否小于等于右边的，如果是，则返回 true。	[ $a -le $b ] 返回 true。
```
```shell
a=10
b=20
if [[ $a eq $b ]];then
echo "等于"
fi
```

### 布尔运算符

```shell
!	非运算，表达式为 true 则返回 false，否则返回 true。	[ ! false ] 返回 true。
-o	或运算，有一个表达式为 true 则返回 true。	[ $a -lt 20 -o $b -gt 100 ] 返回 true。
-a	与运算，两个表达式都为 true 才返回 true。	[ $a -lt 20 -a $b -gt 100 ] 返回 false。
```

### 文件测试符号

```shell
b file	检测文件是否是块设备文件，如果是，则返回 true。	[ -b $file ] 返回 false。
-c file	检测文件是否是字符设备文件，如果是，则返回 true。	[ -c $file ] 返回 false。
-d file	检测文件是否是目录，如果是，则返回 true。	[ -d $file ] 返回 false。
-f file	检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true。	[ -f $file ] 返回 true。
-g file	检测文件是否设置了 SGID 位，如果是，则返回 true。	[ -g $file ] 返回 false。
-k file	检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true。	[ -k $file ] 返回 false。
-p file	检测文件是否是有名管道，如果是，则返回 true。	[ -p $file ] 返回 false。
-u file	检测文件是否设置了 SUID 位，如果是，则返回 true。	[ -u $file ] 返回 false。
-r file	检测文件是否可读，如果是，则返回 true。	[ -r $file ] 返回 true。
-w file	检测文件是否可写，如果是，则返回 true。	[ -w $file ] 返回 true。
-x file	检测文件是否可执行，如果是，则返回 true。	[ -x $file ] 返回 true。
-s file	检测文件是否为空（文件大小是否大于0），不为空返回 true。	[ -s $file ] 返回 true。
-e file	检测文件（包括目录）是否存在，如果是，则返回 true。	[ -e $file ] 返回 true。
```

```shell
file=""
if [[-f $file ]]; then
    echo "is a file"
fi
```
## 流程控制

### if/else

```shell
if [[condition]];then
	echo '1'
fi

//if else

if [[condition]]; then
echo '1'
else
echo '2'
fi

# if elseif else

if [[condition]];then

elif [[condition]];then

fi
```

### for

```shell

for i in list1 list2 ;do
    echo $i
done

for i in 1 2 3 4;do

    echo $i
done
//1 2 3 4

for (( i = 0; i < 10; i++ )); do
	echo $i
done
```

###  while


```shell
while [[ condition ]]; do
	#statements
done
```

**demo例子**

```shell
#! /bin/bash

a=10
b=20

# 判断数值
if [[ $a -ne $b ]]; then
    echo "a 不等于b"
fi

# 判断字符串
if [[ '$a' != '$b' ]]; then
    echo "1"
fi

# 判断文件

if [[  -d "../doc" ]]; then
    echo "dirctory"
fi

if [[ ! -f "../routes" ]]; then
    echo "not a file"
fi


#while
while [[ $a -gt 1   ]]; do
    #statements
    echo $a;
    # 条件
    let a--
done

# for

for i in "wo" "rds"; do
    echo $i
done
```
## 函数

shell中的函数 定义如下


```shell
其中function是可以省略的
[function] functionName(){}

function test(){
    
}

test(){
    
}

```

- 函数的调用


函数的调用和其他语言的调用不太一样


```shell
function test()
{
    echo "hello"
}

test #调用函数

```

- 函数的参数


函数的参数定义不需要在()中定义形参 只需要在调用使用传入即可

`$n n代表整数` $1是第一个参数 以此类推
```shell
function test()
{
    echo $1 # 第一个参数 以此类推
}

test 22 //22
```
## 引入外部文件

在shell中有时候需要引入外部的脚本文件 我们需要使用下面的两种方式


1.  .    filename

```shell
. ./a.sh
```

2. source filename

在文件中使用source


```shell
source  ./a.sh
```
## 命令行接收参数

在执行 Shell 脚本时，向脚本传递参数，脚本内获取参数的格式为：$n。n 代表一个数字，1 为执行脚本的第一个参数，2 为执行脚本的第二个参数。

```shell
$ bash test.sh test test2
  $0 代表脚本文件 //test.sh
  $1 代表第一个参数 //test
  $# 参数的个数 // 2
  $* 所有参数 

for i in  $*; do
	echo $i
done

$$ 脚本运行的进程号

$! 最后一个进程号
$? 最后退出的状态 0 表示没有问题

```