## PHP

- [手册笔记](https://github.com/xianyunyh/studynotes/tree/Master/PHP/PHP%E6%89%8B%E5%86%8C%E7%AC%94%E8%AE%B0)
- [官方文档](HTTP://php.net/Manual/zh/langref.php)
- [数组函数]()
- [字符串函数]()
- [垃圾回收机制]()
- [面向对象]()

  - 封装
  - 继承
  - 多态
- [zval 结构]()
- [魔术方法]()
- [抽象类和接口]()
- [MVC]()
- [访问修饰符]()
- [正则表达式]()
- [FPM、FastCGI]()
- [PSR 规范](https://github.com/PizzaLiu/PHP-Fig)
  - **PSR 1 基本代码规范 **
  - **PSR 2 代码风格指南 **
  - **PSR 3 日志接口 **
  - **PSR 4 改进的自动加载 **

### Zval 引用计数

在 PHP5 中，每个变量都存在一个叫 zval 的结构中，这个结构包括变量的类型和变量的值。第一个是 IS_Ref, 表示是不是引用集合，PHP 通过这个把引用变量和普通变量区分开，还有一个字段叫 `Ref_count` 表示这个 zval 容器的个数。PHP5

```c_CPP
struct _zval_struct {
    Union {
        Long lval;
        Double dval;
        struct {
            Char *Val;
            int Len;
        } str;
        HashTable *ht;
        Zend_object_value obj;
        Zend_ast *ast;
    } value;
    Zend_uint refcount__gc;
    Zend_uchar type;
    Zend_uchar IS_Ref__gc;
};
```

复合类型的变量把他们的成员属性都存在自己的符号表里。```pph
<?php
$a = array('meaning' => 'life', 'number' => 42 );
xdebug_debug_zval('a');
?>
a: (refcount=1, is_ref=0)=array ('meaning' => (refcount=1, is_ref=0)='life',
   'number' => (refcount=1, IS_Ref=0)=42
)
```

### 回收周期

我们先要建立一些基本规则，如果一个引用计数增加，它将继续被使用，当然就不再在垃圾中。如果引用计数减少到零，所在变量容器将被清除（free)。就是说，仅仅在引用计数减少到非零值时，才会产生垃圾周期（garbage cycle)。其次，在一个垃圾周期中，通过检查引用计数是否减 1，并且检查哪些变量容器的引用次数是零，来发现哪部分是垃圾

### 面向对象

1. 封装性：也称为信息隐藏，就是将一个类的使用和实现分开，只保留部分接口和方法与外部联系，或者说只公开了一些供开发人员使用的方法。于是开发人员只需要关注这个类如何使用，而不用去关心其具体的实现过程，这样就能实现 MVC 分工合作，也能有效避免程序间相互依赖，实现代码模块间松藕合。2. 继承性：就是子类自动继承其父级类中的属性和方法，并可以可以添加新的属性和方法或者对部分属性和方法进行重写。继承增加了代码的可重用性。PHP 只支持单继承，也就是说一个子类只能有一个父类。3. 多态性：子类继承了来自父级类中的属性和方法，并对其中部分方法进行重写。于是多个子类中虽然都具有同一个方法，但是这些子类实例化的对象调用这些相同的方法后却可以获得完全不同的结果，这种技术就是多态性。多态性增强了软件的灵活性。### 访问权限修饰符 

- public 公开的。任何地方都能访问
- protected 保护的、只能在本类和子类中访问
- private 私有的。只能在本类调用
- final 最终的。被修饰的方法或者类，不能被继承或者重写
- static 静态

### 接口和抽象类区别

- 接口使用 interface 声明，抽象类使用 abstract
- 抽象类可以包含属性方法。接口不能包含成员属性、- 接口不能包含非抽象方法



### CSRF XSS

CSRF，跨站请求伪造，攻击方伪装用户身份发送请求从而窃取信息或者破坏系统。讲述基本原理：用户访问 A 网站登陆并生成了 Cookie，再访问 B 网站，如果 A 网站存在 CSRF 漏洞，此时 B 网站给 A 网站的请求（此时相当于是用户访问），A 网站会认为是用户发的请求，从而 B 网站就成功伪装了你的身份，因此叫跨站脚本攻击。CSRF 防范：1. 合理规范 Api 请求方式，GET，Post

2. 对 Post 请求加 token 令牌验证，生成一个随机码并存入 Session，表单中带上这个随机码，提交的时候服务端进行验证随机码是否相同。XSS，跨站脚本攻击。防范：不相信任何输入，过滤输入。### CGI、FastCGI、FPM

CGI 全称是“公共网关接口”（Common Gateway Interface)，HTTP 服务器与你的或其它机器上的程序进行“交谈”的一种工具，其程序须运行在网络服务器上。CGI 是 HTTP Server 和一个独立的进程之间的协议，把 **HTTP Request 的 Header 设置成进程的环境变量 **，HTTP Request 的正文设置成进程的标准输入，而进程的标准输出就是 HTTP Response 包括 Header 和正文。FastCGI 像是一个常驻 (Long-live) 型的 CGI，它可以一直执行着，只要激活后，不会每次都要花费时间去 fork 一次（这是 CGI 最为人诟病的 fork-and-execute 模式）。它还支持分布式的运算，即 FastCGI 程序可以在网站服务器以外的主机上执行并且接受来自其它网站服务器来的请求。Fpm 是一个实现了 Fastcgi 协议的程序， 用来管理 Fastcgi 起的进程的， 即能够调度 PHP-CGI 进程的程序 

#### FastCGI 特点

1. FastCGI 具有语言无关性。
2. FastCGI 在进程中的应用程序，独立于核心 Web 服务器运行，提供了一个比 Api 更安全的环境。APIs 把应用程序的代码与核心的 Web 服务器链接在一起，这意味着在一个错误的 Api 的应用程序可能会损坏其他应用程序或核心服务器。恶意的 Api 的应用程序代码甚至可以窃取另一个应用程序或核心服务器的密钥。3. FastCGI 技术目前支持语言有：C/C++、Java、Perl、Tcl、Python、Smalltalk、Ruby 等。相关模块在 Apache, ISS, Lighttpd 等流行的服务器上也是可用的。4. FastCGI 的不依赖于任何 Web 服务器的内部架构，因此即使服务器技术的变化， FastCGI 依然稳定不变。#### FastCGI 的工作原理

1. Web Server 启动时载入 FastCGI 进程管理器（IIS ISAPI 或 Apache Module)
2. FastCGI 进程管理器自身初始化，启动多个 CGI 解释器进程 (可见多个 PHP-CGI) 并等待来自 Web Server 的连接。3. 当客户端请求到达 Web Server 时，FastCGI 进程管理器选择并连接到一个 CGI 解释器。Web server 将 CGI 环境变量和标准输入发送到 FastCGI 子进程 PHP-CGI。4. FastCGI 子进程完成处理后将标准输出和错误信息从同一连接返回 Web Server。当 FastCGI 子进程关闭连接时，请求便告处理完成。FastCGI 子进程接着等待并处理来自 FastCGI 进程管理器 (运行在 Web Server 中） 的下一个连接。在 CGI 模式中，PHP-CGI 在此便退出了。