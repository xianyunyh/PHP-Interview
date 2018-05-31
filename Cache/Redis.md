## redis

redis是一个开源的支持多种数据类型的key=>value的存储数据库。支持字符串、列表、集合、有序集合、哈希五种类型

图片过大，请下载到本地打开

![redis](redis.png)

### redis 和memcache区别

1. Redis不仅仅支持简单的k/v类型的数据，同时还提供list，set，hash等数据结构的存储。 

2. Redis支持数据的备份，即master-slave模式的数据备份。

3. Redis支持数据的持久化，可以将内存中的数据保持在磁盘中，重启的时候可以再次加载进行使用。



### redis五种类型

#### 字符串

> set 、get、append、strlen

### 列表

> lpush lpop rpop rpush llen  lrem lset

#### 集合

> sadd、smembers、sdiff、spop 、srem、scard

#### 有序集合

> zadd、 zcount、zrem、zrank、

#### 哈希

> hset、hget、hmget、hmset、hkeys、hlen、hsetnx、hvals


