## <center>PHP面试准备的资料</center>

这个项目是自己准备面试整理的资料，包括 PHP、MySQL、Linux、计算机网络、数据结构与算法、设计模式、消息队列、缓存等内容。方便自己以后查阅，会不定期更新，如有错误，欢迎指出，也欢迎大家提交 PR，谢谢大家的 star。

📖 **在线阅读**：<https://xianyunyh.github.io/PHP-Interview/>（基于 VitePress 构建，支持全文搜索）

### 目录

- **[LNMP](Linux/README.md)**
  - [Linux基本操作命令](Linux/Linux命令.md)
  - [Linux网络相关命令](Linux/Linux命令2.md)
  - [Crontab计划任务](Linux/crontab.md)
  - [Inode介绍](Linux/inode.md)
  - [Shell入门教程](Linux/shell.md)
  - [Sed命令](Linux/Sed.md)
  - [Awk命令](Linux/AWK.md)
  - [Linux IO模型](Linux/LinuxIO模型.md)
  - [Vim编辑器](Linux/Vim.md)
  - [Nginx](Linux/Nginx.md)
  - [LAMP/LNMP环境搭建](Linux/lanmp.md)

- **[操作系统](操作系统/README.md)**
  - [操作系统概论](操作系统/README.md)
  - [进程和线程的区别](操作系统/进程和线程.md)

- **数据库**
  - **[MySQL](Mysql/README.md)**
    - [SQL标准](Mysql/SQL标准.md)
    - [数据库三范式](Mysql/MySQL三范式.md)
    - [存储引擎](Mysql/存储引擎.md)
    - [事务](Mysql/事务.md)
    - [锁](Mysql/锁.md)
    - [索引](Mysql/索引.md)
    - [explain分析SQL](Mysql/explain.md)
    - [MySQL优化](Mysql/MySQL优化.md)
    - [MySQL索引原理及慢查询优化](Mysql/MySQL索引原理及慢查询优化.md)
  - [MongoDB](MongoDb/MongoDB.md)

- **[计算机网络](计算机网络/README.md)**
  - [IP协议](计算机网络/IP协议.md)
  - [TCP协议](计算机网络/TCP协议.md)
  - [UDP协议](计算机网络/UDP协议.md)
  - [HTTP协议](计算机网络/HTTP协议.md)
  - [HTTPS协议](计算机网络/HTTPS.md)
  - [HTTP2协议](计算机网络/HTTP2.md)
  - [Websocket协议](计算机网络/Webscokt.md)

- **[版本控制器](版本控制器/README.md)**
  - [Git](版本控制器/Git.md)
  - [Git 如何移除中间某些提交](版本控制器/Git_removeCommits.md)

- **[数据结构](数据结构/README.md)**
  - [数组](数据结构/数组.md)
  - [链表](数据结构/链表.md)
  - [堆栈](数据结构/堆栈.md)
  - [散列表](数据结构/散列表.md)
  - [字符串](数据结构/字符串.md)
  - [二叉树基本操作](数据结构/二叉树基本操作.md)
  - [Leetcode经典二叉树题目集合](数据结构/Leetcode经典二叉树题目集合.md)

- **[算法](算法/README.md)**
  - [二分查找](算法/二分查找.md)
  - [动态规划](算法/动态规划.md)
  - [排序算法（冒泡/选择/插入/希尔/快排）](算法/README.md)
  - [编程之法：面试和算法心得](https://wizardforcel.gitbooks.io/the-art-of-programming-by-july/content/03.02.html)

- **[消息队列](MQ/README.md)**
  - [RabbitMQ](MQ/rabbitmq.md)
  - [消息队列常见面试题](MQ/question.md)

- **缓存系统**
  - [Redis](Cache/Redis.md)

- **[PHP](PHP/README.md)**
  - [PHP7新特性](PHP/php7.md)
  - [PHP运行原理](PHP/PHP运行原理.md)
  - [Zval结构](PHP/PHP-Zval结构.md)
  - [HashTable](PHP/PHP7-HashTable.md)
  - [PHP-FPM配置选项](PHP/PHP-FPM配置选项.md)
  - [正则表达式](PHP/正则表达式.md)
  - [PHP手册笔记](PHP/PHP手册笔记/README.md)（基本语法、变量常量、运算符、流程控制、函数、面向对象、命名空间、错误异常处理）
  - [PHP8新特性](PHP/PHP8.md)
  - [PHP8.1新特性](PHP/PHP8.1.md)
  - [PHP8.2新特性](PHP/PHP8.2.md)

- **[设计模式](设计模式/README.md)**
  - [创建型模式](设计模式/Creational.md)
  - [结构型模式](设计模式/Structural.md)
  - [行为型模式](设计模式/Behavioral.md)

- **[架构和系统设计](架构和系统设计/README.md)**
  - [API设计（REST）](架构和系统设计/API设计.md)

- **[面试](面试/README.md)**
  - [离职原因回答](面试/01离职原因回答.md)
  - [写简历](面试/02写简历.md)
  - [裸辞应对](面试/03裸辞应对.md)
  - [面试提问](面试/04面试提问.md)
  - [谈薪资](面试/05谈薪资.md)
  - [笔试题1](面试/笔试题.md) / [笔试题2](面试/笔试题2.md) / [笔试题3](面试/笔试题3.md) / [笔试题4](面试/笔试题4.md)
  - [面试题5](面试/面试题5.md) / [面试题6](面试/面试题6.md)
  - [面试总结](面试/面试总结.md)

## 本地预览文档站点

本项目使用 [VitePress](https://vitepress.dev/) 搭建文档站点，`master` 分支推送后会通过 GitHub Actions（见 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)）自动构建并发布到 GitHub Pages。

> 注意：仓库原来使用 Jekyll 从分支构建 GitHub Pages。切换到 VitePress 后，请在仓库 `Settings → Pages` 中，将 **Build and deployment → Source** 改为 **GitHub Actions**，新的工作流才会生效。

```bash
$ git clone https://github.com/xianyunyh/PHP-Interview
$ cd PHP-Interview
$ npm install
$ npm run docs:dev    # 本地预览，默认 http://localhost:5173
$ npm run docs:build  # 生成静态文件到 .vitepress/dist
```

## 推荐阅读资料
- [PHP函数库](http://overapi.com/php)
- [PHP7内核剖析](https://github.com/pangudashu/php7-internal)
- [php7-internal](https://github.com/laruence/php7-internal)
- [PHP7-HashTable](http://nikic.github.io/2014/12/22/PHPs-new-hashtable-implementation.html)
- [PHP7-zval](http://nikic.github.io/2015/05/05/Internal-value-representation-in-PHP-7-part-1.html)
- [PHP中的变化](https://github.com/tpunt/PHP7-Reference)
- [PHP资源集合](https://github.com/ziadoz/awesome-php)
- [设计模式PHP实现](https://github.com/domnikl/DesignPatternsPHP)
- [Swoole](https://www.swoole.com/)
- [程序员的内功-算法和数据结构](http://www.cnblogs.com/jingmoxukong/p/4329079.html)
- [数据结构和算法](http://www.cnblogs.com/skywang12345/p/3603935.html)
- [剑指offer-PHP实现](https://blog.csdn.net/column/details/15795.html)

## 致谢

- [OMGZui](https://github.com/OMGZui)
- [fymmx](https://github.com/fymmx)



如果这个系列的文章，对您有所帮助，您可以选择打赏一下作者。谢谢！

![qrcode](mm_reward_qrcode.jpg)
