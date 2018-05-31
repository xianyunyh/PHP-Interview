## PHP-FPM

FPM（FastCGI 进程管理器）用于替换 PHP FastCGI 的大部分附加功能，对于高负载网站是非常有用的。

它的功能包括：

- 支持平滑停止/启动的高级进程管理功能；
- 可以工作于不同的 uid/gid/chroot 环境下，并监听不同的端口和使用不同的 php.ini 配置文件（可取代 safe_mode 的设置）；
- stdout 和 stderr 日志记录;
- 在发生意外情况的时候能够重新启动并缓存被破坏的 opcode;
- 文件上传优化支持;
- "慢日志" - 记录脚本（不仅记录文件名，还记录 PHP backtrace 信息，可以使用 ptrace或者类似工具读取和分析远程进程的运行数据）运行所导致的异常缓慢;
- [fastcgi_finish_request()](http://php.net/manual/zh/function.fastcgi-finish-request.php) - 特殊功能：用于在请求完成和刷新数据后，继续在后台执行耗时的工作（录入视频转换、统计处理等）；
- 动态／静态子进程产生；
- 基本 SAPI 运行状态信息（类似Apache的 mod_status）；
- 基于 php.ini 的配置文件。

### 全局配置选项

- pid

  pid文件的位置

- error_log

  错误日志的位置

- log_level

  错误的级别  alert 、error、warning、notice、debug、默认是notice

- syslog.facility 

  设置何种程序记录消息 默认daemon

- syslog.ident

  为每条消息 添加前缀

- emergency_restart_interval 

  如果子进程在 *emergency_restart_interval* 设定的时间内收到该参数设定次数的 SIGSEGV 或者 SIGBUS退出信息号，则FPM会重新启动。0 表示“关闭该功能”。默认值：0（关闭） 

- process_control_timeout

  设置子进程接受主进程复用信号的超时时间 可用单位：s（秒），m（分），h（小时）或者 d（天）。默认单位：s（秒）。默认值：0（关闭）。 

- process_max 

  fork的最大的fpm的进程数

- process.priority

  设置master进程的nice（2） 优先级

- daemonize

  设置php-fpm后台运行。默认是yes

- rlimit_core 

  设置master 进程打开的core最大的尺寸

- events.mechaism

  设置fpm的使用的事件机制 select、pool、epoll、kqueue (*BSD)、port (Solaris ）

- systemd_interval

  使用systemd集成的fpm时，设置间歇秒数

### 运行时配置

- listen

  设置接受的fastcgi请求的地址可用格式为：'ip:port'，'port'，'/path/to/unix/socket'。每个进程池都需要设置 

- listen.backlog

  设置backlog的最大值

- listen.allowed_clients

  设置允许链接到fastcgi的ip地址

- listen.owner listen.group  listen.mode 

  设置权限

- user group

  fpm运行的Unix用户 必须设置的

- pm

  设置进程管理器如何管理子进程

  - static 子进程是固定的 = *pm.max_children* 
  - *ondemand*  进程在有需求时才产生 
  - *dynamic*   子进程的数量在下面配置的基础上动态设置 *pm.max_children*，*pm.start_servers*，*pm.min_spare_servers*，*pm.max_spare_servers*。 

- pm.max_children

  pm设置为staic时。表示创建的子进程的数量。

  pm为dynamic时，表示最大可创建的进程数

- pm.start_servers

  设置启动时创建的子进程的数目。仅在 *pm* 设置为 *dynamic* 时使用 。就是初始化创建的进程数

- pm.min_spare_servers 

  设置空闲进程的最大数目

- pm.process_idle_timeout

  秒。多久之后结束空闲进程

- pm.max_requests

  设置每个子进程重生之前的服务的请求数。

- pm.status_path

  fpm状态的页面的地址

- ping.path

  fpm监控页面的ping的地址

- ping.resource

  用于定于ping请求的返回响应 默认是pong

- request_terminate_timeout

  设置单个请求的超时中止时间。

- request_slowlog_timeout

  当一个请求该设置的超时时间后，就会将对应的 PHP 调用堆栈信息完整写入到慢日志中 

- slowlog

  慢请求的记录日志

- rlimit_files

  设置打开文件描述符的限制

- access.log

  访问日志

- access.format

  acces log的格式

### 优化

#### 内核调优

- 调整linux内核打开文件的数量。

```shell
echo `ulimit -HSn 65536` >> /etc/profile
echo `ulimit -HSn 65536` >> /etc/rc.local
source /etc/profile 
```

#### PHP-FPM配置调优

- 进程数调整

>pm.max_children = 300; **静态方式**下开启的php-fpm进程数量 　　
>
>pm.start_servers = 20; **动态方式**下的起始php-fpm进程数量 　　
>
>pm.min_spare_servers = 5; **动态方式**下的最小php-fpm进程数量 　　
>
>pm.max_spare_servers = 35; **动态方式**下的最大php-fpm进程数量 
>
>request_slowlog_timeout = 2; 开启慢日志
>slowlog = log/$pool.log.slow; 慢日志路径
>
>rlimit_files = 1024; 增加php-fpm打开文件描述符的限制

**一般来说一台服务器正常情况下每一个php-cgi所耗费的内存在20M左右 。**

用内存/20 就大概算出最大的进程数。

一般初始化的进程有一个类似的公式

```
start_servers = min_spare_servers + (max_spare_servers - min_spare_servers) / 2；
```



如果长时间没有得到处理的请求就会出现504 Gateway Time-out这个错误，而正在处理的很累的那几个php-cgi如果遇到了问题就会出现502 Bad gateway这个错误 

- **最大请求数**

  最大处理请求数是指一个php-fpm的worker进程在处理多少个请求后就终止掉，master进程会重新respawn一个新的。

  这个配置的主要目的是避免php解释器或程序引用的第三方库造成的内存泄露。

  ​     pm.max_requests = 10240

- 最长执行时间

  最大执行时间在php.ini和php-fpm.conf里都可以配置，配置项分别为max_execution_time和request_terminate_timeout。 

