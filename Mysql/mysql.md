1、选择优化的数据类型。

更小的数据类型，通常会更好。

尽量避免使用NULL

尽量使用整型作为标志列

小心使用enum和set。避免使用bit

尽量使用相同的数据类型存储相似的或者相关的值。

整数类型

tinyint 、smallint、mediaint、int、bigint

分别占8、16、24、32、64位空间

字符串类型

varchar、char类型

char是定长

varchar 变长

![](C:\Users\tianlei\AppData\Local\YNote\data\qqFCD2B62BA40B4F467C9197ACBDE2373C\f9b3789cf1bb413aa826dafed613782b\clipboard.png)

blob和text类型

二进制和字符存储

枚举类型

枚举enum 替代一些常用的预定义集合

enum("a","b")

日期时间类型

datetime 精确到秒 2018-02-22 12：02：23：12

date 精确到日期 2018-02-22

timestamp 时间戳类型

位操作类型

bit(8) 8位

values(b"00000001")

缓存表和吭余表

![](C:\Users\tianlei\AppData\Local\YNote\data\qqFCD2B62BA40B4F467C9197ACBDE2373C\e622165991d04b6d852684d81f8c0d51\clipboard.png)

![](C:\Users\tianlei\AppData\Local\YNote\data\qqFCD2B62BA40B4F467C9197ACBDE2373C\a3649fdb92c64c26b9056d6da9efaf80\clipboard.png)
