## nginx
Nginx是一款轻量级的Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，在BSD-like 协议下发行。其特点是占有内存少，并发能力强，已经渐渐取代老牌Apache 作为新的web服务器使用。
### 安装

依赖环境介绍

- gcc gcc-c++

> gcc为GNU Compiler Collection的缩写，可以编译C和C++源代码等，它是GNU开发的C和C++以及其他很多种语言 的编译器（最早的时候只能编译C，后来很快进化成一个编译多种语言的集合，如Fortran、Pascal、Objective-C、Java、Ada、 Go等。）
gcc 在编译C++源代码的阶段，只能编译 C++ 源文件，而不能自动和 C++ 程序使用的库链接（编译过程分为编译、链接两个阶段，注意不要和可执行文件这个概念搞混，相对可执行文件来说有三个重要的概念：编译（compile）、链接（link）、加载（load）。源程序文件被编译成目标文件，多个目标文件连同库被链接成一个最终的可执行文件，可执行文件被加载到内存中运行）。因此，通常使用 g++ 命令来完成 C++ 程序的编译和连接，该程序会自动调用 gcc 实现编译。
gcc-c++也能编译C源代码，只不过把会把它当成C++源代码，后缀为.c的，gcc把它当作是C程序，而g++当作是c++程序；后缀为.cpp的，两者都会认为是c++程序，注意，虽然c++是c的超集，但是两者对语法的要求是有区别的。
- make automake

> make是一个用来控制可执行文件和其他一些从源文件来的非源代码文件版本的软件。Make可以从一个名为makefile的文件中获得如何构建你所写程序的依赖关系，Makefile中列出了每个目标文件以及如何由其他文件来生成它。
`automake`是一个从`Makefile.am`文件自动生成`Makefile.in`的工具。为了生成`Makefile.in`，automake还需用到perl，由于`automake`创建的发布完全遵循GNU标准，所以在创建中不需要`perl`。libtool是一款方便生成各种程序库的工具。

- autoconf

> autoconf是用来生成自动配置软件源代码脚本（configure）的工具

- pcre pcre-devel

> 在Nginx编译需要 PCRE(Perl Compatible Regular Expression)，因为Nginx 的Rewrite模块和HTTP 核心模块会使用到PCRE正则表达式语法。

- zlip zlib-devel

> nginx启用压缩功能的时候，需要此模块的支持。
- openssl openssl-devel 

> 开启SSL的时候需要此模块的支持。
- libtool

> libtool是一个通用库支持脚本，将使用动态库的复杂性隐藏在统一、可移植的接口中；使用libtool的标准方法，可以在不同平台上创建并调用动态库。
libtool主要的一个作用是在编译大型软件的过程中解决了库的依赖问题；将繁重的库依赖关系的维护工作承担下来，从而释放了程序员的人力资源。libtool提供统一的接口，隐藏了不同平台间库的名称的差异等细节，生成一个抽象的后缀名为la高层库`libxx.la`（其实是个文本文件），并将该库对其它库的依赖关系，都写在该la的文件中。

```shell

$ sudo yum -y install gcc gcc-c++ make automake autoconf pcre pcre-devel zlib zlib-devel openssl openssl-devel libtool
$ wget http://nginx.org/download/nginx-1.14.0.tar.gz
$ tar zxvf nginx-1.14.0.tar.gz
$ ./configure  --prefix=/usr/local/nginx  --sbin-path=/usr/local/nginx/sbin/nginx --conf-path=/usr/local/nginx/conf/nginx.conf --error-log-path=/var/log/nginx/error.log  --http-log-path=/var/log/nginx/access.log  --pid-path=/var/run/nginx/nginx.pid --lock-path=/var/lock/nginx.lock  --user=nginx --group=nginx --with-http_ssl_module --with-http_stub_status_module --with-http_gzip_static_module --http-client-body-temp-path=/var/tmp/nginx/client/ --http-proxy-temp-path=/var/tmp/nginx/proxy/ --http-fastcgi-temp-path=/var/tmp/nginx/fcgi/ --http-uwsgi-temp-path=/var/tmp/nginx/uwsgi --http-scgi-temp-path=/var/tmp/nginx/scgi --with-pcre
$ make && make install
```

### nginx 配置

nginx的关于web服务器的配置，在http项中.每个server 对应一个主机

```
http {
    server {}
    server{}
}
```


```
user www-data;
pid /run/nginx.pid;
worker_processes auto;
worker_rlimit_nofile 65535;

events {
	multi_accept on;
	worker_connections 65535;
}

http {
	charset utf-8;
	sendfile on;
	tcp_nopush on;
	tcp_nodelay on;
	server_tokens off;
	log_not_found off;
	types_hash_max_size 2048;
	client_max_body_size 16M;

	# MIME
	include mime.types;
	default_type application/octet-stream;

	# logging
	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log warn;

	# SSL
	ssl_session_timeout 1d;
	ssl_session_cache shared:SSL:10m;
	ssl_session_tickets off;

	# Diffie-Hellman parameter for DHE ciphersuites
	ssl_dhparam /etc/nginx/dhparam.pem;

	# Mozilla Intermediate configuration
	ssl_protocols TLSv1.2 TLSv1.3;
	ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;

	# OCSP Stapling
	ssl_stapling on;
	ssl_stapling_verify on;
	resolver 1.1.1.1 1.0.0.1 8.8.8.8 8.8.4.4 208.67.222.222 208.67.220.220 valid=60s;
	resolver_timeout 2s;
    #负载均衡
    upstream backend{
        server 127.0.0.1:8050 weight=1 max_fails=2 fail_timeout=10 ;
        server 127.0.0.1:8060 weight=2 max_fails=2 fail_timeout=10 ;
    }
    

    # gzip
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;
    # HTTP 301 重定向
    server {
        listen 80;
        listen [::]:80;
        server_name .example.com;
        location / {
            return 301 https://www.example.com$request_uri;
        }
    }

	server {
        listen 80;#监听端口
        server_name example.com;#绑定域名
        root /var/www/example.com/public;#网站根目录
        access_log /var/log/nginx/access.log;
	    error_log /var/log/nginx/error.log warn;

        # index.html fallback
        location / {
            try_files $uri $uri/ /index.html;
        }
        # favicon.ico
        location = /favicon.ico {
            log_not_found off;
            access_log off;
        }

        # robots.txt
        location = /robots.txt {
            log_not_found off;
            access_log off;
        }

        # assets, media
        location ~* \.(?:css(\.map)?|js(\.map)?|jpe?g|png|gif|ico|cur|heic|webp|tiff?|mp3|m4a|aac|ogg|midi?|wav|mp4|mov|webm|mpe?g|avi|ogv|flv|wmv)$ {
            expires 7d;
            access_log off;
        }

        # svg, fonts
        location ~* \.(?:svgz?|ttf|ttc|otf|eot|woff2?)$ {
            add_header Access-Control-Allow-Origin "*";
            expires 7d;
            access_log off;
        }
        # php配置
        location ~ \.php$ {
		    include fastcgi_params;
            # fastcgi settings
            # fastcgi_pass 127.0.0.1:9000
            fastcgi_pass			unix:/var/run/php/php7.2-fpm.sock;
            fastcgi_index			index.php;
            fastcgi_buffers			8 16k;
            fastcgi_buffer_size		32k;
            # fastcgi params
            fastcgi_param DOCUMENT_ROOT		$realpath_root;
            fastcgi_param SCRIPT_FILENAME	$realpath_root$fastcgi_script_name;
            fastcgi_param PHP_ADMIN_VALUE	"open_basedir=$base/:/usr/lib/php/:/tmp/";
	    }
        #反向代理
        location ^~/api/ {
            proxy_pass http://127.0.0.1:3000;
            proxy_http_version	1.1;
            proxy_cache_bypass	$http_upgrade;
            proxy_set_header Upgrade			$http_upgrade;
            proxy_set_header Connection 		"upgrade";
            proxy_set_header Host				$host;
            proxy_set_header X-Real-IP			$remote_addr;
            proxy_set_header X-Forwarded-For	$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto	$scheme;
            proxy_set_header X-Forwarded-Host	$host;
            proxy_set_header X-Forwarded-Port	$server_port;
        }
        # 负载
        location ^~/user/ {
            proxy_set_header X-Real-IP			$remote_addr;
            proxy_pass http://backend
        }
    }

}
```

### nginx 负载均衡的方式

- 权重
```
upstream backend{ 
      server 10.0.0.77 weight=5; 
      server 10.0.0.88 weight=10; 
}
```
- ip_hash

根据客户端的ip的hash结果进行分配。这样每一个访客的固定访问的服务器都是一台机器
```
upstream backend{ 
      server 10.0.0.77; 
      server 10.0.0.88; 
}
```
- fair 第三方

按后端服务器的响应时间来分配请求。响应时间短的优先分配。

```
 upstream backend{      
      server 10.0.0.10:8080; 
      server 10.0.0.11:8080; 
      fair; 
}
```
- url_hash
按訪问url的hash结果来分配请求，使每一个url定向到同一个后端服务器。后端服务器为缓存时比較有效。

```
 upstream backend{ 
      server 10.0.0.10:7777; 
      server 10.0.0.11:8888; 
      hash $request_uri; 
      hash_method crc32; 
}

upstream bakend{ 
    #定义负载均衡设备的Ip及设备状态 
      ip_hash; 
      server 10.0.0.11:9090 down; 
      server 10.0.0.11:8080 weight=2; 
      server 10.0.0.11:6060; 
      server 10.0.0.11:7070 backup; 
}
```

upstream还能够为每一个设备设置状态值，这些状态值的含义分别例如以下：

- down 表示单前的server临时不參与负载.

- weight 默觉得1.weight越大，负载的权重就越大。

- max_fails ：同意请求失败的次数默觉得1.当超过最大次数时，返回proxy_next_upstream 模块定义的错误.

- fail_timeout : max_fails次失败后。暂停的时间。

- backup： 其他全部的非backup机器down或者忙的时候，请求backup机器。所以这台机器压力会最轻。

### nginx启动 和停止停止
```shell
$ /usr/local/nginx/sbin/nginx

#平滑启动
$ /usr/local/nginx/sbin/nginx -s reload
#停止
$ /usr/local/nginx/sbin/nginx -s stop
```