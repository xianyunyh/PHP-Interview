## redis

redis 是一个开源的支持多种数据类型的 key=>value 的存储数据库。支持字符串、列表、集合、有序集合、哈希五种类型

图片过大，请下载到本地打开

![redis](redis.png)

### redis 和 memcache 区别

1. Redis 不仅仅支持简单的 k / v 类型的数据，同时还提供 list，set，hash 等数据结构的存储。2. Redis 支持数据的备份，即 master-slave 模式的数据备份。3. Redis 支持数据的持久化，可以将内存中的数据保持在磁盘中，重启的时候可以再次加载进行使用。### redis 五种类型

#### 字符串

> set、get、append、strlen

### 列表

> lpush lpop rpop rpush llen  lrem lset

#### 集合

> sadd、smembers、sdiff、spop、srem、scard

#### 有序集合

> zadd、zcount、zrem、zrank、#### 哈希

> hset、hget、hmget、hmset、hkeys、hlen、hsetnx、hvals


