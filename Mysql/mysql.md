复习mysql，整理的资料和笔记

- [SQL标准](https://github.com/xianyunyh/PHP-Interview/tree/master/Mysql/SQL标准.md)

- [数据库三范式](https://github.com/xianyunyh/PHP-Interview/tree/master/Mysql/MySQL三范式.md)

- [存储引擎](https://github.com/xianyunyh/PHP-Interview/blob/master/Mysql/%E5%AD%98%E5%82%A8%E5%BC%95%E6%93%8E.md)

- [事务](https://github.com/xianyunyh/PHP-Interview/tree/master/Mysql/事务.md)

- [explain](https://github.com/xianyunyh/PHP-Interview/tree/master/Mysql/MySQL【explain】.md)

- [索引](https://github.com/xianyunyh/PHP-Interview/tree/master/Mysql/索引.md)

- [MySQL优化](https://github.com/xianyunyh/PHP-Interview/blob/master/Mysql/MySQL%E4%BC%98%E5%8C%96.md)

- [MySQL索引原理及慢查询优化](https://github.com/xianyunyh/PHP-Interview/tree/master/Mysql/MySQL索引原理及慢查询优化.md)

1、选择优化的数据类型。

更小的数据类型，通常会更好。

尽量避免使用NULL

尽量使用整型作为标志列

小心使用enum和set。避免使用bit

尽量使用相同的数据类型存储相似的或者相关的值。

## 整数类型

tinyint 、smallint、mediaint、int、bigint

分别占8、16、24、32、64位空间

## 字符串类型

varchar、char类型

char是定长

varchar 变长

blob和text类型

二进制和字符存储

## 枚举类型

enum("a","b")

## 日期时间类型

datetime 精确到秒 2018-02-22 12：02：23：12

date 精确到日期 2018-02-22

timestamp 时间戳类型

## 位操作类型

bit(8) 8位

values(b"00000001")
