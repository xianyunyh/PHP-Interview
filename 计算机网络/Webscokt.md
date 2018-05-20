## Websocket协议

> Websocket是html5提出的一个协议规范，参考rfc6455。
>
> websocket约定了一个通信的规范，通过一个握手的机制，客户端（浏览器）和服务器（webserver）之间能建立一个类似tcp的连接，从而方便c－s之间的通信。在websocket出现之前，web交互一般是基于http协议的短连接或者长连接。
>
> WebSocket是为解决客户端与服务端实时通信而产生的技术。websocket协议本质上是一个基于tcp的协议，是先通过HTTP/HTTPS协议发起一条特殊的http请求进行握手后创建一个用于交换数据的TCP连接，此后服务端与客户端通过此TCP连接进行实时通信。



### Websocket和HTTP协议的关系

同样作为应用层的协议，WebSocket在现代的软件开发中被越来越多的实践，和HTTP有很多相似的地方，这里将它们简单的做一个纯个人、非权威的比较：

#### 相同点

1. 都是基于TCP的应用层协议。
2. 都使用Request/Response模型进行连接的建立。
3. 在连接的建立过程中对错误的处理方式相同，在这个阶段WS可能返回和HTTP相同的返回码。
4. 都可以在网络中传输数据。

#### 不同点

1. WS使用HTTP来建立连接，但是定义了一系列新的header域，这些域在HTTP中并不会使用。
2. WS的连接不能通过中间人来转发，它必须是一个直接连接。
3. WS连接建立之后，通信双方都可以在任何时刻向另一方发送数据。
4. WS连接建立之后，数据的传输使用帧来传递，不再需要Request消息。
5. WS的数据帧有序。



### 协议

#### 1. 握手

客户端发起握手。

```http
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com 
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
```

从上面的协议中可以看到websocket基于HTTP协议的GET。而且只支持GET.

**Upgrade**：upgrade是HTTP1.1中用于定义转换协议的header域。它表示，如果服务器支持的话，客户端希望使用现有的「网络层」已经建立好的这个「连接（此处是TCP连接）」，切换到另外一个「应用层」（此处是WebSocket）协议。 

**Connection**：HTTP1.1中规定Upgrade只能应用在「直接连接」中，所以带有Upgrade头的HTTP1.1消息必须含有Connection头，因为Connection头的意义就是，任何接收到此消息的人（往往是代理服务器）都要在转发此消息之前处理掉Connection中指定的域（不转发Upgrade域）。 

**Sec-WebSocket-＊**：第7行标识了客户端支持的子协议的列表（关于子协议会在下面介绍），第8行标识了客户端支持的WS协议的版本列表，第5行用来发送给服务器使用（服务器会使用此字段组装成另一个key值放在握手返回信息里发送客户端）。 

服务端响应

```http
HTTP/1.1 101 Switching Protocols
Content-Length: 0
Upgrade: websocket
Sec-Websocket-Accept: ZEs+c+VBk8Aj01+wJGN7Y15796g=
Server: TornadoServer/4.5.1
Connection: Upgrade
Date: Wed, 21 Jun 2017 03:29:14 GMT
```

Sec-Websocket-Accept 是一个校验。用客户端发来的sec_key 服务器通过sha1计算拼接商GUID【258EAFA5-E914-47DA-95CA-C5AB0DC85B11 】 。然后再base64encode 

#### 数据传输

客户端和服务器连接成功后，就可以进行通信了，通信协议格式是WebSocket格式，服务器端采用Tcp Socket方式接收数据，进行解析，协议格式如下：

![img](https://images2015.cnblogs.com/blog/827837/201604/827837-20160426152052033-1112357880.jpg)  

  这里使用的是数据存储的位（bit），当进行加密的时候，最终要的一位就是最左边的第一个。

- FIN ：1bit ，表示是消息的最后一帧，如果消息只有一帧那么第一帧也就是最后一帧。

- RSV1，RSV2，RSV3：每个1bit，必须是0，除非扩展定义为非零。如果接受到的是非零值但是扩展没有定义，则需要关闭连接。

- Opcode：4bit，解释Payload数据，规定有以下不同的状态，如果是未知的，接收方必须马上关闭连接。状态如下：0x0(附加数据帧)    0x1(文本数据帧)   0x2(二进制数据帧)    0x3-7(保留为之后非控制帧使用)  0xB-F(保留为后面的控制帧使用)    0x8(关闭连接帧)  0x9(ping)  0xA(pong)

-   

   Mask：1bit，掩码，定义payload数据是否进行了掩码处理，如果是1表示进行了掩码处理。

  ```
  Masking-key域的数据即是掩码密钥，用于解码PayloadData。客户端发出的数据帧需要进行掩码处理，所以此位是1。
  ```

- Payload length：7位，7 + 16位，7+64位，payload数据的长度，如果是0-125，就是真实的payload长度，如果是126，那么接着后面的2个字节对应的16位无符号整数就是payload数据长度；如果是127，那么接着后面的8个字节对应的64位无符号整数就是payload数据的长度。

- Masking-key：0到4字节，如果MASK位设为1则有4个字节的掩码解密密钥，否则就没有。

- Payload data：任意长度数据。包含有扩展定义数据和应用数据，如果没有定义扩展则没有此项，仅含有应用数据。

### 客户端

```js
var websocket = new WebSocket("ws://127.0.0.1")
websocket.onopen = function(){
    
}
    
websocket.onmessage = function(){}

websocket.onclose = function(){}
```

