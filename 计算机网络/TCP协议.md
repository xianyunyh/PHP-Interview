# TCP（传输控制协议）

> 传输控制协议（Transmission Control Protocol，TCP）是一种面向连接的、可靠的、基于字节流的传输层通信协议，由IETF的RFC 793定义。
> 在因特网协议族（Internet protocol suite）中，TCP层是位于IP层之上，应用层之下的中间层。

## 一、TCP/IP协议族

> TCP/IP（TCP/IP Protocol Suite）是一个协议族，包含两个核心协议：TCP（传输控制协议）和IP（网际协议），类似计算机科学中的堆栈，因此又被称为TCP/IP协议栈，分为四个层次：

  ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-ip-protocal.png)

## TCP/IP各个分层详解

  * 应用层

    * 大多数普通与网络相关的程序为了通过网络与其他程序通信所使用的层。这个层的处理过程是应用特有的；数据从网络相关的程序以这种应用内部使用的格式进行传送，然后被编码成标准协议的格式。
    * 应用层负责处理特定的应用程序细节。包括Telnet（远程登录）、FTP（文件传输协议）、SMTP（简单邮件传送协议）以及SNMP（简单网络管理协议）等。

  * 传输层

    * 两台主机上的应用程序提供端到端的通信，有2种传输协议：TCP（传输控制协议）和UDP（用户数据报协议）。
    * TCP为两台主机提供高可靠性的数据通信。包括把应用程序交给它的数据分成合适的小块交给下面的网络层，确认接收到的分组，设置发送最后确认分组的超时时钟等。
    * UDP为提供一种非常就爱男单的服务。它只是把称作数据报的分组从一台主机发送到另一台主机，但并不保证该数据报能到达另一端。任何必须的可靠性必须由应用层来提供。

  * 网络互联层

    * 处理分组在网络中的活动，例如分组的选路。网络层协议包括IP协议（网际协议）、ICMP协议（Internet互联网控制报文协议），以及IGMP协议（Internet组管理协议）。

  * 网络接口层

    * 也称作数据链路层，包括操作系统中的设备驱动程序和计算机中对应的网络接口卡。一起处理与电缆（或其他任何传输媒介）的物理接口细节。

## wireshark抓到的包与对应的协议层如下图所示：

  * wireshark（前称Ethereal）是一个网络数据包分析软件。网络数据包分析软件的功能是截取网络数据包，并尽可能显示出最为详细的网络数据包数据。
  * wireshark抓到的包与对应的协议层如下图所示：

    ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-wireshark.png)

    1、Frame：物理层的数据帧概况

    2、Ethernet II：数据链路层以太网帧头部信息

    3、Internet Protocol Version 4：互联网层IP包头部信息

    4、Transmission Control Protocol：传输层的数据段头部信息，此处是TCP

    5、Hypertext Transfer Protocol：应用层的信息，此处是HTTP协议

## 二、TCP协议

> TCP是一种面向连接（连接导向）的、可靠的基于字节流的传输层通信协议。TCP将用户数据打包成报文段，它发送后启动一个定时器，另一端收到的数据进行确认、对失序的数据重新排序、丢弃重复数据。

  * TCP协议的特点：

    1、面向连接；

    2、每一条TCP连接只能有两个端点，每一条TCP连接只能是点对点的；

    3、TCP提供可靠交付的服务；

    4、TCP提供全双工通信。数据在两个方向上独立的进行传输。因此，连接的每一端必须保持每个方向上的传输数据序号；

    5、面向字节流。面向字节流的含义：虽然应用程序和TCP交互是一次一个数据块，但TCP把应用程序交下来的数据仅仅是一连串的无结构的字节流

      ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-byte-stream.png)

## TCP头部信息

> 指定通信的源端端口号、目的端端口号、管理TCP连接，控制两个方向的数据流

  * TCP报文首部，如下图所示：

    ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-packets-header.png)

  * TCP报文各个位置详解：

    * 1、源端口号：数据发起者的端口号，16bit

    * 2、目的端口号：数据接收者的端口号，16bit

    * 3、序号：32bit的序列号，由发送方使用

    * 4、确认序号：32bit的确认号，是接收数据方期望收到发送方的下一个报文段的序号，因此确认序号应当是上次已成功收到数据字节序号加1

    * 5、首部长度：首部中32bit字的数目，可表示15*32bit=60字节的首部。一般首部长度为20字节。

    * 6、保留：6bit，均为0

    * 7、紧急URG：当URG=1时，表示报文段中有紧急数据，应尽快传送；

    * 8、确认比特ACK：ACK = 1时代表这是一个确认的TCP包，取值0则不是确认包；

    * 9、推送比特PSH：当发送端PSH=1时，接收端尽快的交付给应用进程；

    * 10、复位比特（RST）：当RST=1时，表明TCP连接中出现严重差错，必须释放连接，再重新建立连接；

    * 11、同步比特SYN：在建立连接是用来同步序号。SYN=1,ACK=0表示一个连接请求报文段。SYN=1，ACK=1表示同意建立连接。

    * 12、终止比特FIN：FIN=1时，表明此报文段的发送端的数据已经发送完毕，并要求释放传输连接。

    * 13、窗口：用来控制对方发送的数据量，通知发放已确定的发送窗口上限。

    * 14、校验和：该字段检验的范围包括首部和数据这两部分。由发端计算和存储，并由收端进行验证。

    * 15、紧急指针：紧急指针在URG=1时才有效，它指出本报文段中的紧急数据的字节数。

    * 16、选项：长度可变，最长可达40字节。

  * wireshark捕获到的TCP包中的每个字段如下图所示：

    ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-ip-header-map.png)

## 三、TCP三次握手

> TCP建立连接时，会有三次握手过程，如下图所示，wireshark截获到了三次握手的三个数据包，第四个包才是http的，说明http的确是使用TCP建立连接的。

  ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-three-way-handshake.png)

  * TCP三次握手流程图

    ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-three-way-handshake2.png)

  * 下面来逐步分析三次握手过程：

    * 第一次握手：客户端向服务端发送连接请求包，标志位SYN（同步序号）置为1，序号为X=0。

      ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-handshake-1.png)

    * 第一次对应TCP首部

      ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-handshake-1-1.png)

    * 第二次握手：服务器收到客户端发过来报文，由SYN=1知道客户端要求建立联机。向客户端发送一个SYN和ACK都置为1的TCP报文，设置初始序号Y=0，将确认序号（Acknowledgement Number）设置为客户的序列号加1，即X+1 = 0+1 = 1，如下图：

      ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-handshake-2.png)

    * 第二次对应TCP首部

      ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-handshake-2-1.png)

    * 第三次握手：客户端收到服务器发来的包后检查确认序号（Acknowledgement Number）是否正确，即第一次发送的序号加1（X+1=1）。以及标志位ACK是否为1。若正确，ACK标志位为1，SYN标志位为0。确认序号（AcknowledgementNumber）=Y+1=0+1=1，发送序号为X+1=1。服务端收到后确认序号值与ACK=1，则连接建立成功，可以传送数据。

      ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-handshake-3.png)

    * 第三次对应TCP首部

      ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-handshake-3-1.png)

## 四、TCP四次挥手

  * TCP断开连接时，会有四次断开过程，如下图所示，wireshark截获到了四次断开的四个数据包。

    ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-four-disconnect.png)

  * TCP四次挥手流程图：

    ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-four-disconnect-1.png)

  * 下面来逐步分析四次挥手过程：

    * 1、第一次挥手：客户端给服务器发送TCP包，用来关闭客户端到服务器的数据传送。将标志位FIN和ACK置为1，序号为X=1，确认序号为Z=1。

      ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-four-disconnect-1-1.png)

    * 第一次挥手对应TCP首部

      ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-four-disconnect-1-2.png)

    * 2、第二次挥手：服务器收到FIN后，发回一个ACK（标志位ACK=1），确认序号为收到的序号加1，即X=X+1=2。序号为收到的确认序号=Z。

      ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-four-disconnect-2-1.png)

    * 第二次挥手对应TCP首部

      ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-four-disconnect-2-2.png)

    * 3、服务器关闭与客户端的连接，发送一个FIN。标志位FIN和ACK置为1，序号为Y=1，确认序号为X=2。

      ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-four-disconnect-3-1.png)

    * 第三次挥手对应TCP首部

      ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-four-disconnect-3-2.png)

    * 4、客户端收到服务器发送的FIN之后，发回ACK确认（标志位ACK=1），确认序号为收到的序号加1，即Y+1=2。序号为收到的确认序号X=2。

      ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-four-disconnect-4-1.png)

    * 第四次挥手对应TCP首部

      ![Alt text](https://raw.githubusercontent.com/zqjflash/tcp-ip-protocal/master/tcp-four-disconnect-4-2.png)

