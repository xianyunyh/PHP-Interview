## LAMP 环境的配置

安装环境 centos6.x.root 权限下操作。安装顺序为 Apache、PHP、MySQL

### 1. 安装 gcc 编译器以及相关工具

```shell
yum -y install gcc gcc-c++  autoconf  automake libtool pcre pcre-devel
```

### 2. 安装 apache2.4.12

apacehe 依赖 apr 和 apr-util

- apache2.4.12 的源码包 [http://mirrors.cnnic.cn/apache//httpd/httpd-2.4.12.tar.gz](http://mirrors.cnnic.cn/apache//httpd/httpd-2.4.12.tar.gz)
- APR 1.5.2 源码包下载地址 [http://mirrors.cnnic.cn/apache//apr/apr-1.5.2.tar.gz](http://mirrors.cnnic.cn/apache//apr/apr-1.5.2.tar.gz "http://mirrors.cnnic.cn/apache//apr/apr-1.5.2.tar.gz")
- APR-util 1.5.4 源码包下载地址 [http://mirrors.cnnic.cn/apache//apr/apr-util-1.5.4.tar.gz](http://mirrors.cnnic.cn/apache//apr/apr-util-1.5.4.tar.gz)

#### 2.1 编译安装 apr 和 ap-util

```shell
tar -zxf apr-1.4.5.tar.gz
cd apr-1.4.5
./configure --prefix=/usr/local/apr
make && make install
#编译 util
tar zxvf apr-util-1.5.4.tar.gz
cd apr-util-1.5.4
./configure --prefix=/usr/local/apr-util --with-apr=/usr/local/apr/bin/apr-1-config
make && make install
```

#### 2.2 编译 Apache

```shell
tar zxvf tar zxvf httpd-2.4.12.tar.gz
cd httpd-2.4.12
./configure --prefix=/usr/local/apache \
	--enable-so \
	--with-apr=/usr/local/apr  \
	--with-apr-util=/usr/local/apr-util  \
	-enable-modules=all \
	--enable-rewrite \
	--enable-mods-shared=all \
>make && make install
```

#### 2.3 添加服务脚本放行 80 端口

```Shell
 CP /usr/local/Apache/bin/apachectl /etc/init.d/HTTPd
 #放开 80 端口
 Vi /etc/sysconfig/iptables
#增加以下内容
-A INPUT -m State --State New -m TCP -p TCP --dport 80 -j ACCEPT
#重启防火墙
service iptables restart
```

### 3. 安装 PHP

#### 3.1 安装前准备

安装 PHP 拓展所需要的依赖。如 gd 库、zlib、Curl 等

```Shell
Yum -y install libmcrypt-devel mhash-devel libxslt-devel \
	libjpeg libjpeg-devel libpng libpng-devel freetype freetype-devel libxml2 libxml2-devel \
	zlib zlib-devel glibc glibc-devel glib2 glib2-devel bzip2 bzip2-devel \
	ncurses ncurses-devel Curl Curl-devel e2fsprogs e2fsprogs-devel \
	krb5 krb5-devel libidn libidn-devel openssl openssl-devel
```

#### 3.2 编译 PHP

下载 PHP 的源码包。 从国内的搜狐镜像下载 [HTTP://mirrors.sohu.com/](HTTP://mirrors.sohu.com/)

HTTP://mirrors.sohu.com/PHP/PHP-7.2.1.tar.gz

```Shell
wget -c HTTP://mirrors.sohu.com/PHP/PHP-7.2.1.tar.gz
Tar zxvf PHP-7.2.1.tar.gz
cd PHP-7.2.1

./configure --prefix=/usr/local/PHP \
	--enable-mbstring  --with-Curl \
	--with-bz2  --with-zlib  \
	--enable-pcntl \
	--with-mhash --enable-zip  \
	--with-mysqli=mysqlnd \
	--with-pdo-mysql=mysqlnd \
	--with-gd --with-JPEG-dir --with-freetype-dir --with-png-dir \
	--with-APXS2=/usr/local/Apache/bin/APXS \
```

#### 3.3 整合 PHP 和 Apache

- 编辑 Apache 配置文件

```Shell
vim /usr/local/Apache/conf/httpd.conf
#增加以下信息
AddType application/x-HTTPd-PHP .php
```

- 更改默认页地址

```Shell
<IfModule dir_module>
    DirectoryIndex index.html
</IfModule>
#改为
<IfModule dir_module>
    DirectoryIndex index.php index.html
</IfModule>
```

- 重启 Apache

```Shell
service HTTPd restart
```



### Lnmp 安装





