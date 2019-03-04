## 磁盘管理

查看磁盘空间利用大小

```
DF -h
```

查看当前目录所占空间大小

```
du -sh
```

## 打包和解压

在 Linux 中打包和压缩和分两步来实现的

Tar、zip 命令

打包是将多个文件归并到一个文件：

```Shell
Tar -cvf etc.tar /etc <== 仅打包，不压缩！gzip demo.txt #压缩
zip -q -r html.zip /Home/Blinux/HTML #打包压缩成 zip 文件
```

解压

```Shell
Tar -zxvf xx.tar.gz
unzip test.zip# 解压 zip 文件
```

## 进程管理

### 查看进程 ps

```Shell
 ps -ef	# 查询正在运行的进程信息
 ps -A | grep Nginx #查看进程中的 Nginx
 top #显示进程信息，并实时更新
 lsof -p 23295 #查询指定的进程 ID(23295) 打开的文件：```

### 杀死进程 Kill

```Shell
# 杀死指定 PID 的进程 (PID 为 Process ID)
Kill 1111
#杀死相关进程
Kill -9 3434
```

## 查看网络服务和端口

netstat 命令用于显示各种网络相关信息，如网络连接，路由表，接口状态 (Interface Statistics)，masquerade 连接，多播成员 (Multicast Memberships) 等等。列出所有端口 (包括监听和未监听的）:

```
netstat -a

```

列出所有 TCP 端口：

```
netstat -at

```

列出所有有监听的服务状态：

```
netstat -l
```

## 查看内存 free

缺省时 free 的单位为 KB

```Shell
$free
total       used       free     shared    buffers     cached
Mem:       8175320    6159248    2016072          0     310208    5243680
-/+ buffers/cache:     605360    7569960
Swap:      6881272      16196    6865076
```

free 的输出一共有四行，第四行为交换区的信息，分别是交换的总量（total），使用量（used）和有多少空闲的交换区（free），这个比较清楚，不说太多