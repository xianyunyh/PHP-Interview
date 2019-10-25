## LAMP环境的配置

安装环境 centos6.x.root权限下操作。安装顺序为Apache、PHP、MySQL

### 1. 安装gcc编译器以及相关工具

```shell
yum -y install gcc gcc-c++  autoconf  automake libtool pcre pcre-devel
```

### 2. 安装apache2.4.12

apacehe 依赖apr和apr-util

- apache2.4.12 的源码包[http://mirrors.cnnic.cn/apache//httpd/httpd-2.4.12.tar.gz](http://mirrors.cnnic.cn/apache//httpd/httpd-2.4.12.tar.gz)
- APR 1.5.2 源码包下载地址 [http://mirrors.cnnic.cn/apache//apr/apr-1.5.2.tar.gz](http://mirrors.cnnic.cn/apache//apr/apr-1.5.2.tar.gz "http://mirrors.cnnic.cn/apache//apr/apr-1.5.2.tar.gz")
- APR-util 1.5.4 源码包下载地址 [http://mirrors.cnnic.cn/apache//apr/apr-util-1.5.4.tar.gz](http://mirrors.cnnic.cn/apache//apr/apr-util-1.5.4.tar.gz)

#### 2.1 编译安装apr和ap-util

```shell
tar -zxf apr-1.4.5.tar.gz
cd apr-1.4.5
./configure --prefix=/usr/local/apr
make && make install
#编译util
tar zxvf apr-util-1.5.4.tar.gz
cd apr-util-1.5.4
./configure --prefix=/usr/local/apr-util --with-apr=/usr/local/apr/bin/apr-1-config
make && make install
```

#### 2.2 编译Apache

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

#### 2.3 添加服务脚本放行80端口

```shell
 cp /usr/local/apache/bin/apachectl /etc/init.d/httpd
 #放开80端口
 vi /etc/sysconfig/iptables
#增加以下内容
-A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT
#重启防火墙
service iptables restart
```

### 3. 安装PHP

#### 3.1 安装前准备

安装php拓展所需要的依赖。如gd库、zlib、curl等

```shell
yum -y install libmcrypt-devel mhash-devel libxslt-devel \
	libjpeg libjpeg-devel libpng libpng-devel freetype freetype-devel libxml2 libxml2-devel \
	zlib zlib-devel glibc glibc-devel glib2 glib2-devel bzip2 bzip2-devel \
	ncurses ncurses-devel curl curl-devel e2fsprogs e2fsprogs-devel \
	krb5 krb5-devel libidn libidn-devel openssl openssl-devel
```

#### 3.2 编译PHP

下载php的源码包.从国内的搜狐镜像下载[http://mirrors.sohu.com/](http://mirrors.sohu.com/)

http://mirrors.sohu.com/php/php-7.2.1.tar.gz

```shell
wget -c http://mirrors.sohu.com/php/php-7.2.1.tar.gz
tar zxvf php-7.2.1.tar.gz
cd php-7.2.1

./configure --prefix=/usr/local/php \
	--enable-mbstring  --with-curl \
	--with-bz2  --with-zlib  \
	--enable-pcntl \
	--with-mhash --enable-zip  \
	--with-mysqli=mysqlnd \
	--with-pdo-mysql=mysqlnd \
	--with-gd --with-jpeg-dir --with-freetype-dir --with-png-dir \
	--with-apxs2=/usr/local/apache/bin/apxs \
```

#### 3.3整合PHP和Apache

- 编辑apache配置文件

```shell
vim /usr/local/apache/conf/httpd.conf
#增加以下信息
AddType application/x-httpd-php .php
```

- 更改默认页地址

```shell
<IfModule dir_module>
    DirectoryIndex index.html
</IfModule>
#改为
<IfModule dir_module>
    DirectoryIndex index.php index.html
</IfModule>
```

- 重启apache

```SHELL
service httpd restart
```