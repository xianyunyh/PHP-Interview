## MySQL知识整理

MySQL 是面试中最常被考察的数据库，这里按照“基础语法 → 存储引擎 → 事务与锁 → 索引与优化”的顺序整理笔记，方便按主题查阅。

### 基础

- [SQL标准](SQL标准.md) —— DDL/DML/DCL 等 SQL 语言分类与常用语法
- [数据库三范式](MySQL三范式.md) —— 1NF/2NF/3NF 的定义与范式化设计
- [常用数据类型整理](mysql.md) —— 字段类型选型笔记与参考资料

### 存储引擎与事务

- [存储引擎](存储引擎.md) —— MyISAM、InnoDB 等常用存储引擎对比
- [事务](事务.md) —— 事务的四大特性（ACID）与隔离级别
- [锁](锁.md) —— 乐观锁、悲观锁、共享锁与排他锁

### 索引与优化

- [索引](索引.md) —— 索引的分类、聚簇索引与非聚簇索引
- [explain 分析 SQL](explain.md) —— 执行计划中每一列的含义
- [MySQL优化](MySQL优化.md) —— SQL 优化、配置优化的常见思路
- [MySQL索引原理及慢查询优化](MySQL索引原理及慢查询优化.md) —— 索引底层数据结构与慢查询优化实践


### 阅读资料

- [MySQL索引背后的数据结构及算法原理](http://blog.codinglabs.org/articles/theory-of-mysql-index.html) 

- [MySQL索引原理及慢查询优化](https://tech.meituan.com/mysql-index.html)

- [InnoDB备忘录 - Next-Key Lock](http://zhongmingmao.me/2017/05/19/innodb-next-key-lock/)

- [MySQL主从复制与读写分离](https://www.cnblogs.com/luckcs/articles/2543607.html)

