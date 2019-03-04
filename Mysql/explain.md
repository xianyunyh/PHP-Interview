调用 explain

explain 可以查看查询计划的信息，如果 sql 语句中包含子查询，mysql 依然会执行子查询，将结果放到一个临时表中。然后完成外层的优化查询


## EXPLAIN 中的列

explain 中总是有相同的列。### id 列
这个 id 包含一个标号，标识 select 所属的行。如果语句中没有子查询或者联合，id 唯一。mysql 将查询分为简单查询和复杂查询，复杂查询分为子查询、派生表（FROM 中的子查询）、union 查询。### select_type 列

这一列显示对应的行是简单查询还是复杂查询。，如果是简单 查询 就是 simple。如果是复杂查询，则是以下的几种值

1. SUBQUERY 

包含在 select 列表中的 select

```sql
select (select id from user) from user
```

2. DERIVED

DERIVED 值用来表示包含在 from 子查询中的 select。```sql
select id from (select id from user where id>100);
```

3. Union

在 Union 中的第二个值和 select 都被标记为 Union

4. Union result

用来从临时表检索结果的 select 被标记为 Union result


### table 列

对应访问的表。### type 列

mysql 决定查找表中的行

- all

全表扫描。- Index

 跟全表扫描一样，只是按照索引的顺序进行。优点避免了排序，缺点就是按照整个索引读取整个表的开销。- range
 
范围扫描。就是一个有限制的索引扫描，开始于索引的一点，结束到匹配的值。比如 between 或者 where 带有  范围的条件

- Ref

这是一种索引访问，返回匹配到某个单个值的行，一般是非唯一索引或者非唯一索引的前缀索引。- EQ_Ref

使用这种索引查找，一般是通过唯一索引或者主键索引查找的时候看到

- const system

mysql 对查询的部分进行优化转成一个常量的时候，比如把一行中的主键放入到 where 条件中

```SQL

select * from user where name = ID ;
```
- Null

mysql 在优化阶段分解查询语句，在执行阶段不用访问表或者访问索引。### possible_Keys 

这列显示的是 mysql 可以使用的索引

### Key 列

决定了 mysql 采用哪个索引来对表的访问。### Key_Len 列

mysql 在索引使用的字节数

### Ref 列

显示之前的表在 Key 列记录的索引，中，查找值所用的列或常量。### rows 列

估算查到需要结果的而读取到的行数。### fiteread 列

查询记录和总记录的一个百分比

### extra 列

额外的信息

- using Index 使用覆盖索引
- using where 
- using temproary 使用临时表
- using filesort 使用文件排序
- 