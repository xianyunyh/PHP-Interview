## NoSQL 简介            

NoSQL(NoSQL = Not Only SQL)，意即 " 不仅仅是 SQL“。NoSQL，指的是非关系型的数据库。NoSQL 有时也称作 Not Only SQL 的缩写，是对不同于传统的关系型数据库的数据库管理系统的统称。## MongoDB 简介

MongoDB 是由 C ++ 语言编写的，是一个基于分布式文件存储的开源数据库系统。在高负载的情况下，添加更多的节点，可以保证服务器性能。MongoDB 旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。MongoDB 将数据存储为一个文档，数据结构由键值 (key=>value) 对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。** 主要特点 **

1. MongoDB 的提供了一个面向文档存储，操作起来比较简单和容易。2. 可以在 MongoDB 记录中设置任何属性的索引 (如：FirstName="Sameer",Address="8.Gandhi Road")来实现更快的排序。3. 可以通过本地或者网络创建数据镜像，这使得 MongoDB 有更强的扩展性。4. 如果负载的增加（需要更多的存储空间和更强的处理能力），它可以分布在计算机网络   中的其他节点上这就是所谓的分片。5. Mongo 支持丰富的查询表达式。查询指令使用 JSON 形式的标记，可轻易查询文档中内嵌的对象及数组。6. MongoDb 使用 update()命令可以实现替换完成的文档（数据）或者一些指定的数据字段。Mongodb 中的 Map/reduce 主要是用来对数据进行批量处理和聚合操作。7. Map 和 Reduce。Map 函数调用 emit(Key,value)遍历集合中所有的记录，将 Key 与 value 传给 Reduce 函数进行处理。8. Map 函数和 Reduce 函数是使用 Javascript 编写的，并可以通过 db.runCommand 或 mapreduce 命令来执行 MapReduce 操作。9. GridFS 是 MongoDB 中的一个内置功能，可以用于存放大量小文件。10. MongoDB 允许在服务端执行脚本，可以用 Javascript 编写某个函数，直接在服务端执行，也可以把函数的定义存储在服务端，下次直接调用即可。11. MongoDB 支持各种编程语言：Ruby，Python，Java，C++，PHP，C# 等多种语言。1
12. MongoDB 安装简单。## MongoDB 概念介绍

| SQL 术语 / 概念 | MongoDB 术语 / 概念 | 解释 / 说明                           |
| ------------ | ---------------- | ----------------------------------- |
| database     | database         | 数据库                              |
| table        | collection       | 表 / 集合                             |
| Row          | document         | 行 / 文档                             |
| column       | filed            | 数据字段 / 域                         |
| Index        | Index            | 索引                                |
| primary Key  | primary Key      | 主键，MongoDB 自动将_ID 字段设置为主键 |

一个集合中的文档实例

```JSON
{
    "username":"Tim",
    "age":18
}
```

## MongoDB 相关操作

```Shell
show DBS #查看数据库列表
use Test #创建并切换到 Test 库
show collections #查看数据库的所有集合
# 集合相关操作
db.testCollection.insert({"name":"hello"}) #创建 testCollection 库并插入数据
db.testCollection.find() #查询 testCollection 所有数据
db.testCollection.drop()# 删除集合
db.testCollection.find().limit(5) #显示 5 条
#文档操作
db.users.find({age: {$gt: 18}},                                  // 查询条件
  {name: 1, address: 1}                        // 查询显示字段
).limit(5)  

db.users.update({age: {$gt: 18}},
   {$Set: {status: "A"}},
   {multi: True}                        //multi 指所有行修改
)

#统计文档的个数
db.testCollection.count()
```

## MongoDB 数据类型

下表为 MongoDB 中常用的几种数据类型。| 数据类型           | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| String             | 字符串。存储数据常用的数据类型。在 MongoDB 中，UTF-8 编码的字符串才是合法的。|
| Integer            | 整型数值。用于存储数值。根据你所采用的服务器，可分为 32 位或 64 位。|
| Boolean            | 布尔值。用于存储布尔值（真 / 假）。|
| Double             | 双精度浮点值。用于存储浮点值。|
| Min/Max Keys       | 将一个值与 BSON（二进制的 JSON）元素的最低值和最高值相对比。|
| Arrays             | 用于将数组或列表或多个值存储为一个键。|
| Timestamp          | 时间戳。记录文档修改或添加的具体时间。|
| Object             | 用于内嵌文档。|
| Null               | 用于创建空值。|
| Symbol             | 符号。该数据类型基本上等同于字符串类型，但不同的是，它一般用于采用特殊符号类型的语言。|
| Date               | 日期时间。用 UNIX 时间格式来存储当前日期或时间。你可以指定自己的日期时间：创建 Date 对象，传入年月日信息。|
| Object ID          | 对象 ID。用于创建文档的 ID。|
| Binary Data        | 二进制数据。用于存储二进制数据。|
| Code               | 代码类型。用于在文档中存储 Javascript 代码。|
| Regular expression | 正则表达式类型。用于存储正则表达式。|

### 文档操作

#### 1. 插入

```Shell
db.Collection.insertOne({"user":"Zhang0"}) #插入单条
db.collection.insertMany([{},{}]) #插入多条
```

#### 2. 查询

```JSON
 [{ item: "journal", qty: 25, size: { h: 14, w: 21, uom: "CM"}, status: "A" },
   {item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in"}, status: "A" },
   {item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in"}, status: "D" },
   {item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "CM"}, status: "D" },
   {item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "CM"}, status: "A" }
]
```

```Shell
db.inventory.find() #查找所有 =SELECT * FROM inventory
db.inventory.find({ "size.h": { $lt: 15} } )
```

- 条件查询

```Shell
db.inventory.find({ status: "D"} ) # SELECT * FROM inventory WHERE status = "D"
```

- in 查询

```Shell
db.inventory.find({ status: { $in: [ "A", "D"] } } )
# SELECT * FROM inventory WHERE status in ("A", "D")
```

- AND

```Shell
db.inventory.find({ status: "A", qty: { $lt: 30} } )
#SELECT * FROM inventory WHERE status = "A" AND qty < 30
```

- OR

```Shell
db.inventory.find({ $or: [ { status: "A"}, {qty: { $lt: 30} } ] } )
# SELECT * FROM inventory WHERE status = "A" OR qty < 30
```

- 指定 filed

等于 1 标识查询。等于 0 不显示。默认显示_id

```shell
db.inventory.find({ status: "A"}, {item: 1, status: 1} )
# SELECT _id, item, status from inventory WHERE status = "A"
```

#### 3. 修改

- updateOne 更新单条记录

```shell
db.inventory.updateOne({ item: "paper"},
   {$set: { "size.uom": "cm", status: "P"},
     $currentDate: {lastModified: true}
   }
)

# UPDATE inventory SET item = paper WHERE `size.uom` = 'cm' AND status = 'p' LIMIT 1
```

- updateMany 更新多条

```shell
db.inventory.updateMany({ "qty": { $lt: 50} },
   {$set: { "size.uom": "in", status: "P"},
     $currentDate: {lastModified: true}
   }
)
```

- repalce

```shell
db.inventory.replaceOne({ item: "paper"},
   {item: "paper", instock: [ { warehouse: "A", qty: 60}, {warehouse: "B", qty: 40} ] }
)
```

#### 4. 删除

- deleteOne 删除单条

```shell
db.orders.deleteOne({ w : "majority", wtimeout : 100}
   );
# DELETE FROM orders where w = "majority" AND  wtimeout = 100
```

- remove 删除整个文档

```shell
db.orders.remove() # DELETE FROM orders
```

#### 5. 创建索引

```shell
db.inventory.createIndex({"name":"username"})
```

`$text 	` 查询运算符

```shell
db.stores.find({ $text: { $search: "java coffee shop"} } )
```

#### 5. 聚合操作

MongoDB 中聚合 (aggregate) 主要用于处理数据（诸如统计平均值， 求和等），并返回计算后的数据结果。有点类似 sql 语句中的 count(*)。-  aggregate() 方法

```shell
db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : 1}}}])  
# select by_user, count(*) from mycol group by by_user
```

| `$sum`      | 计算总和。| db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : "$likes"}}}]) |
| --------- | ---------------------------------------------- | ------------------------------------------------------------ |
| `$avg`      | 计算平均值                                     | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$avg : "$likes"}}}]) |
| `$min`      | 获取集合中所有文档对应值得最小值。| db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}]) |
| $max      | 获取集合中所有文档对应值得最大值。| db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$max : "$likes"}}}]) |
| `$push`     | 在结果文档中插入值到一个数组中。| db.mycol.aggregate([{$group : {_id : "$by_user", url : {$push: "$url"}}}]) |
| $addToSet | 在结果文档中插入值到一个数组中，但不创建副本。| db.mycol.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}]) |
| $first    | 根据资源文档的排序获取第一个文档数据。| db.mycol.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}]) |
| `$last`     | 根据资源文档的排序获取最后一个文档数据         | db.mycol.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}]) |

 聚合框架中常用的几个操作：- $project：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。- $match：用于过滤数据，只输出符合条件的文档。$match 使用 MongoDB 的标准查询操作。- $limit：用来限制 MongoDB 聚合管道返回的文档数。- $skip：在聚合管道中跳过指定数量的文档，并返回余下的文档。- $unwind：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。- $group：将集合中的文档分组，可用于统计结果。- $sort：将输入文档排序后输出。- $geoNear：输出接近某一地理位置的有序文档

```shell
db.articles.aggregate( [{ $match : { score : { $gt : 70, $lte : 90} } },  
	{$group: { _id: null, count: { $sum: 1} } }                  
	] );  
#$match 用于获取分数大于 70 小于或等于 90 记录，然后将符合条件的记录送到下一阶段 $group 管道操作符进行处理。```

** 聚合后排序操作 **

```bash
db.getCollection('position').aggregate({
    "$group": {
        "_id": "$create_time",
        "count": {"$sum": 1}
    }
    
},{
        "$sort": {"_id": -1}
})
```

** 起别名 **

```bash
db.getCollection('position').aggregate({
    "$group": {
        "_id": "$create_time",
        "count": {"$sum": 1}
    }
    
},{
        "$sort": {"_id": -1}
    },{
        "$project": {
            "date": "$_id",
            "count": 1,
            "_id": 0
        }
    })
```





### 原子性和事务处理

在 MongoDB 中，一个写操作的原子性是基于单个文档的，即使写操作是在单个文档内部更改多个嵌套文档。当一个写操作修改了多个文档，每个文档的更新是具有原子性的，但是整个操作作为一个整体是不具有原子性的，并且与其他操作可能会有所交替。但是，您可以使用：update:[`](http://www.mongoing.com/docs/core/write-operations-atomicity.html#id1)$isolated` 操作将多个文档单的写操作 * 隔离 * 成单个的写操作，> update:`$isolated` 操作将使写操作在集合上获得一个排他锁，甚至对于文档级别的锁存储引擎比如 WiredTiger 也是这样处理的。这也就是说在执行：update:`$isolated` 操作运行期间会导致 WiredTiger 单线程运行。