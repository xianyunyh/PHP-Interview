## RabbitMQ 消息队列

> RabbitMQ 是流行的开源消息队列系统，用 erlang 语言开发，完整的实现了 AMPQ（高级消息队列协议）## AMQP 协议

> AMQP，是应用层协议的一个开放标准，为面向消息的中间件设计。消息中间件主要用于组件之间的解耦，消息的发送者无需知道消息使用者的存在，同样，消息使用者也不用知道发送者的存在。AMQP 的主要特征是面向消息、队列、路由（包括点对点和发布 / 订阅）、可靠性、安全

## 系统架构



![](images/20140220173559828)
消息队列的使用过程大概如下：（1）客户端连接到消息队列服务器，打开一个 Channel。（2）客户端声明一个 exchange，并设置相关属性。（3）客户端声明一个 queue，并设置相关属性。（4）客户端使用 routing Key，在 exchange 和 queue 之间建立好绑定关系。（5）客户端投递消息到 exchange。exchange 接收到消息后，就根据消息的 Key 和已经设置的 binding，进行消息路由，将消息投递到一个或多个队列里

## Rabbitmq 中几个概念的解释

- ** 生产者 **

![](images/20161103174653291.jpg)

生产者就是产生消息并向 RabbitMq 队列发送消息

- ** 消费者 **

![](images/20161103182929513.jpg)

等待 RabbitMq 消息到来并处理消息

- **Queue**(队列）

![](images/20161103182938987.jpg)
Queue(队列）, 依存于 RabbitMQ 内部， 消息存在队列中。它指定消息按什么规则，路由到哪个队列

- ** 交换器（exchange)**

![](HTTP://ostest.qiniudn.com/wordpress/WP-content/uploads/2014/02/2014-2-21-9-51-03.png)

生产者将消息发送到 Exchange（交换器），由 Exchange 将消息路由到一个或多个 Queue 中。 它指定消息按什么规则，路由到哪个队列

- **binding 绑定 **

![](HTTP://ostest.qiniudn.com/wordpress/WP-content/uploads/2014/02/2014-2-21-9-52-46.png)

它的作用就是把 exchange 和 queue 按照路由规则绑定起来

- routing Key 路由关键字

exchange 根据这个关键字将消息投放到对应的队列中去。- **Binding Key**

在绑定（Binding）Exchange 与 Queue 的同时，一般会指定一个 binding Key；生产者将消息发送给 Exchange 时，一般会指定一个 routing Key；当 binding Key 与 routing Key 相匹配时，消息将会被路由到对应的 Queue 中

- ** 虚拟主机 **

一个虚拟主机持有一组交换机、队列和绑定。隔离不同的队列和用户的权限管理。![](images/v63YbyA.png)

-  **Channel 消息通道 **

在客户端的每个连接里，可建立多个 Channel，每个 Channel 代表一个会话任务

-Exchange type 交换模式

RabbitMQ 提供了四种 Exchange 模式：fanout,direct,topic,header 

一、**Fanout**

![](images/306976-20160728104237622-1486261669.png)

它采取广播模式，消息进来时，将会被投递到与改交换机绑定的所有队列中。所有发送到 Fanout Exchange 的消息都会被转发到与该 Exchange 绑定 (Binding) 的所有 Queue 上。Fanout Exchange  不需要处理 RouteKey。只需要简单的将队列绑定到 exchange

二、**Direct **

![](images/306976-20160728104255372-2049742072.png)

Direct 模式， 消息传递时，RouteKey 必须完全匹配，才会被队列接收，否则该消息会被抛弃。三。 **Topic **

![](images/306976-20160728104309934-1385658660.png)

Exchange 将 RouteKey 和某 Topic 进行模糊匹配。此时队列需要绑定一个 Topic。可以使用通配符进行模糊匹配，符号“#”匹配一个或多个词，符号“*”匹配不多不少一个词。因此“log.#”能够匹配到“log.info.oa”，但是“log.*”只会匹配到“log.error