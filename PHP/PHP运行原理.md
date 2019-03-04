PHP 说简单，但是要精通也不是一件简单的事。我们除了会使用之外，还得知道它底层的工作原理。PHP 是一种适用于 web 开发的动态语言。具体点说，就是一个用 C 语言实现包含大量组件的软件框架。更狭义点看，可以把它认为是一个强大的 UI 框架。了解 PHP 底层实现的目的是什么？动态语言要像用好首先得了解它，内存管理、框架模型值得我们借鉴，通过扩展开发实现更多更强大的功能，优化我们程序的性能。### **PHP 的设计理念及特点 **

多进程模型：由于 PHP 是多进程模型，不同请求间互不干涉，这样保证了一个请求挂掉不会对全盘服务造成影响。当然，随着时代发展，PHP 也早已支持多线程模型。弱类型语言：和 C /C++、Java、C# 等语言不同，PHP 是一门弱类型语言。一个变量的类型并不是一开始就确定不变，运行中才会确定并可能发生隐式或显式的类型转换，这种机制的灵活性在 web 开发中非常方便、高效，具体会在后面 PHP 变量中详述。引擎 (Zend)+ 组件（ext) 的模式降低内部耦合。中间层 (sapi) 隔绝 web server 和 PHP。语法简单灵活，没有太多规范。缺点导致风格混杂，但再差的程序员也不会写出太离谱危害全局的程序。### PHP 的四层体系

PHP 的核心架构如下图：php-core

 ![php-core](https://www.awaimai.com/wp-content/uploads/2016/02/php-core-476x500.png) 

 

从图上可以看出，PHP 从下到上是一个 4 层体系：1. Zend 引擎：Zend 整体用纯 C 实现，是 PHP 的内核部分，它将 PHP 代码翻译（词法、语法解析等一系列编译过程）为可执行 opcode 处理，并实现相应的处理方法，实现了基本的数据结构（如 hashtable、oo）、内存分配及管理、提供了相应的 api 方法供外部调用，是一切的核心，所有的外围功能均围绕 Zend 实现。2. Extensions：围绕着 Zend 引擎，extensions 通过组件式的方式提供各种基础服务，我们常见的各种内置函数（如 array 系列）、标准库等都是通过 extension 来实现，用户也可以根据需要实现自己的 extension 以达到功能扩展、性能优化等目的（如贴吧正在使用的 PHP 中间层、富文本解析就是 extension 的典型应用）。3. Sapi：Sapi 全称是 Server Application Programming Interface，也就是服务端应用编程接口，Sapi 通过一系列钩子函数，使得 PHP 可以和外围交互数据，这是 PHP 非常优雅和成功的一个设计，通过 sapi 成功的将 PHP 本身和上层应用解耦隔离，PHP 可以不再考虑如何针对不同应用进行兼容，而应用本身也可以针对自己的特点实现不同的处理方式。4. Application：这就是我们平时编写的 PHP 程序，通过不同的 sapi 方式得到各种各样的应用模式，如通过 webserver 实现 web 应用、在命令行下以脚本方式运行等等。如果 PHP 是一辆车，那么车的框架就是 PHP 本身，Zend 是车的引擎（发动机），Ext 下面的各种组件就是车的轮子，Sapi 可以看做是公路，车可以跑在不同类型的公路上，而一次 PHP 程序的执行就是汽车跑在公路上。因此，我们需要：性能优异的引擎 + 合适的车轮 + 正确的跑道。### SAPI

如前所述，SAPI 通过通过一系列的接口，使得外部应用可以和 PHP 交换数据，并可以根据不同应用特点实现特定的处理方法，我们常见的一些 sapi 有：**apache2handler**：这是以 apache 作为 webserver，采用 mod_PHP 模式运行时候的处理方式。**cgi**：这是 webserver 和 PHP 直接的另一种交互方式，也就是大名鼎鼎的 fastcgi 协议，在最近今年 fastcgi+PHP 得到越来越多的应用，也是异步 webserver 所唯一支持的方式。**cli**：命令行调用的应用模式



### PHP 的执行流程 &opcode


我们先来看看 PHP 代码的执行所经过的流程。![img](https://www.awaimai.com/wp-content/uploads/2016/02/2011_09_20_02.jpg) 


从图上可以看到，PHP 实现了一个典型的动态语言执行过程：拿到一段代码后，经过词法解析、语法解析等阶段后，源程序会被翻译成一个个指令（opcodes)，然后 ZEND 虚拟机顺次执行这些指令完成操作。PHP 本身是用 C 实现的，因此最终调用的也都是 C 的函数，实际上，我们可以把 PHP 看做是一个 C 开发的软件。PHP 的执行的核心是翻译出来的一条一条指令，也即 opcode。Opcode 是 PHP 程序执行的最基本单位。一个 opcode 由两个参数（op1,op2)、返回值和处理函数组成。PHP 程序最终被翻译为一组 opcode 处理函数的顺序执行。常见的几个处理函数：ZEND_ASSIGN_SPEC_CV_CV_HANDLER : 变量分配（$a=$b）ZEND_DO_FCALL_BY_NAME_SPEC_HANDLER：函数调用

ZEND_CONCAT_SPEC_CV_CV_HANDLER：字符串拼接 $a.$b

ZEND_ADD_SPEC_CV_CONST_HANDLER: 加法运算 $a+2

ZEND_IS_EQUAL_SPEC_CV_CONST：判断相等 $a==1

ZEND_IS_IDENTICAL_SPEC_CV_CONST：判断相等 $a===1



### **HashTable — 核心数据结构 **

HashTable 是 Zend 的核心数据结构，在 PHP 里面几乎并用来实现所有常见功能，我们知道的 PHP 数组即是其典型应用，此外，在 zend 内部，如函数符号表、全局变量等也都是基于 hash table 来实现。PHP 的 hash table 具有如下特点：支持典型的 key->value 查询
可以当做数组使用
添加、删除节点是 O(1) 复杂度
key 支持混合类型：同时存在关联数组合索引数组
Value 支持混合类型：array ("string", 2332)
支持线性遍历：如 foreach
Zend hash table 实现了典型的 hash 表散列结构，同时通过附加一个双向链表，提供了正向、反向遍历数组的功能。其结构如下图：可以看到，在 hash table 中既有 key->value 形式的散列结构，也有双向链表模式，使得它能够非常方便的支持快速查找和线性遍历。散列结构：Zend 的散列结构是典型的 hash 表模型，通过链表的方式来解决冲突。需要注意的是 zend 的 hash table 是一个自增长的数据结构，当 hash 表数目满了之后，其本身会动态以 2 倍的方式扩容并重新元素位置。初始大小均为 8。另外，在进行 key->value 快速查找时候，zend 本身还做了一些优化，通过空间换时间的方式加快速度。比如在每个元素中都会用一个变量 nKeyLength 标识 key 的长度以作快速判定。双向链表：Zend hash table 通过一个链表结构，实现了元素的线性遍历。理论上，做遍历使用单向链表就够了，之所以使用双向链表，主要目的是为了快速删除，避免遍历。Zend hash table 是一种复合型的结构，作为数组使用时，即支持常见的关联数组也能够作为顺序索引数字来使用，甚至允许 2 者的混合。PHP 关联数组：关联数组是典型的 hash_table 应用。一次查询过程经过如下几步（从代码可以看出，这是一个常见的 hash 查询过程，并增加一些快速判定加速查找。）：```c
getKeyHashValue h;
index = n & nTableMask;
Bucket *p = arBucket[index];
while (p) {if ((p->h == h) & (p->nKeyLength == nKeyLength)) {return  p->data;   
    }
    p=p->next;
}
return FALTURE;
```
PHP 索引数组：索引数组就是我们常见的数组，通过下标访问。例如 $arr[0]，Zend HashTable 内部进行了归一化处理，对于 index 类型 key 同样分配了 hash 值和 nKeyLength(为 0)。内部成员变量 nNextFreeElement 就是当前分配到的最大 id，每次 push 后自动加一。正是这种归一化处理，PHP 才能够实现关联和非关联的混合。由于 push 操作的特殊性，索引 key 在 PHP 数组中先后顺序并不是通过下标大小来决定，而是由 push 的先后决定。例如 $arr[1] = 2; $arr[2] = 3; 对于 double 类型的 key，Zend HashTable 会将他当做索引 key 处理

### PHP 变量

PHP 是一门弱类型语言，本身不严格区分变量的类型。PHP 在变量申明的时候不需要指定类型。PHP 在程序运行期间可能进行变量类型的隐示转换。和其他强类型语言一样，程序中也可以进行显示的类型转换。PHP 变量可以分为简单类型 (int、string、bool)、集合类型（array resource object) 和常量（const)。以上所有的变量在底层都是同一种结构 zval。Zval 是 zend 中另一个非常重要的数据结构，用来标识并实现 PHP 变量，其数据结构如下：Zval 主要由三部分组成：type：指定了变量所述的类型（整数、字符串、数组等）refcount&is_ref：用来实现引用计数（后面具体介绍）
value：核心部分，存储了变量的实际数据
Zvalue 是用来保存一个变量的实际数据。因为要存储多种类型，所以 zvalue 是一个 union，也由此实现了弱类型。PHP 变量类型和其实际存储对应关系如下：IS_LONG   -> lvalue
IS_DOUBLE -> dvalue
IS_ARRAY  -> ht
IS_STRING -> str
IS_RESOURCE -> lvalue
引用计数
引用计数在内存回收、字符串操作等地方使用非常广泛。PHP 中的变量就是引用计数的典型应用。Zval 的引用计数通过成员变量 is_ref 和 ref_count 实现，通过引用计数，多个变量可以共享同一份数据。避免频繁拷贝带来的大量消耗。在进行赋值操作时，zend 将变量指向相同的 zval 同时 ref_count++，在 unset 操作时，对应的 ref_count-1。只有 ref_count 减为 0 时才会真正执行销毁操作。如果是引用赋值，则 zend 会修改 is_ref 为 1。PHP 变量通过引用计数实现变量共享数据，那如果改变其中一个变量值呢？当试图写入一个变量时，Zend 若发现该变量指向的 zval 被多个变量共享，则为其复制一份 ref_count 为 1 的 zval，并递减原 zval 的 refcount，这个过程称为“zval 分离”。可见，只有在有写操作发生时 zend 才进行拷贝操作，因此也叫 copy-on-write(写时拷贝）

对于引用型变量，其要求和非引用型相反，引用赋值的变量间必须是捆绑的，修改一个变量就修改了所有捆绑变量。### 整数和浮点数

整数、浮点数是 PHP 中的基础类型之一，也是一个简单型变量。对于整数和浮点数，在 zvalue 中直接存储对应的值。其类型分别是 long 和 double。从 zvalue 结构中可以看出，对于整数类型，和 c 等强类型语言不同，PHP 是不区分 int、unsigned int、long、long long 等类型的，对它来说，整数只有一种类型也就是 long。由此，可以看出，在 PHP 里面，整数的取值范围是由编译器位数来决定而不是固定不变的。对于浮点数，类似整数，它也不区分 float 和 double 而是统一只有 double 一种类型。在 PHP 中，如果整数范围越界了怎么办？这种情况下会自动转换为 double 类型，这个一定要小心，很多 trick 都是由此产生。### ** 字符和字符串 **

和整数一样，字符变量也是 PHP 中的基础类型和简单型变量。通过 zvalue 结构可以看出，在 PHP 中，字符串是由由指向实际数据的指针和长度结构体组成，这点和 c ++ 中的 string 比较类似。由于通过一个实际变量表示长度，和 c 不同，它的字符串可以是 2 进制数据（包含 \0），同时在 PHP 中，求字符串长度 strlen 是 O(1)操作。在新增、修改、追加字符串操作时，PHP 都会重新分配内存生成新的字符串。最后，出于安全考虑，PHP 在生成一个字符串时末尾仍然会添加 \0。常见的字符串拼接方式及速度比较：假设有如下 4 个变量：```php 
$strA = '123';
$strB = '456';
$intA = 123;
$intB = 456;
```
现在对如下的几种字符串拼接方式做一个比较和说明：// 下面两张情况，zend 会重新 malloc 一块内存并进行相应处理，其速度一般
```php
$res = $strA . $strB
$res = "$strA$strB"
```
// 这种是速度最快的，zend 会在当前 strA 基础上直接 relloc，避免重复拷贝
```php
$strA = $strA . $strB

// 这种速度较慢，因为需要做隐式的格式转换，实际编写程序中也应该注意尽量避免
$res = $intA . $intB

// 这会是最慢的一种方式，因为 sprintf 在 PHP 中并不是一个语言结构，// 本身对于格式识别和处理就需要耗费比较多时间，另外本身机制也是 malloc。// 不过 sprintf 的方式最具可读性，实际中可以根据具体情况灵活选择。$strA = sprintf ("%s%s", $strA . $strB);
```

### ** 数组 **

PHP 的数组通过 Zend HashTable 来天然实现。foreach 操作如何实现？对一个数组的 foreach 就是通过遍历 hashtable 中的双向链表完成。对于索引数组，通过 foreach 遍历效率比 for 高很多，省去了 key->value 的查找。count 操作直接调用 HashTable->NumOfElements，O(1)操作。对于 '123' 这样的字符串，zend 会转换为其整数形式。$arr['123']和 $arr[123]是等价的。### ** 资源 **

资源类型变量是 PHP 中最复杂的一种变量，也是一种复合型结构。PHP 的 zval 可以表示广泛的数据类型，但是对于自定义的数据类型却很难充分描述。由于没有有效的方式描绘这些复合结构，因此也没有办法对它们使用传统的操作符。要解决这个问题，只需要通过一个本质上任意的标识符（label）引用指针，这种方式被称为资源。在 zval 中，对于 resource，lval 作为指针来使用，直接指向资源所在的地址。Resource 可以是任意的复合结构，我们熟悉的 mysqli、fsock、memcached 等都是资源。如何使用资源：注册：对于一个自定义的数据类型，要想将它作为资源。首先需要进行注册，zend 会为它分配全局唯一标示。获取一个资源变量：对于资源，zend 维护了一个 id->实际数据的 Hash_tale。对于一个 resource，在 zval 中只记录了它的 ID。fetch 的时候通过 ID 在 Hash_table 中找到具体的值返回。资源销毁：资源的数据类型是多种多样的。Zend 本身没有办法销毁它。因此需要用户在注册资源的时候提供销毁函数。当 unset 资源时，Zend 调用相应的函数完成析构。同时从全局资源表中删除它。资源可以长期驻留，不只是在所有引用它的变量超出作用域之后，甚至是在一个请求结束了并且新的请求产生之后。这些资源称为持久资源，因为它们贯通 SAPI 的整个生命周期持续存在，除非特意销毁。很多情况下，持久化资源可以在一定程度上提高性能。比如我们常见的 mysql_pconnect , 持久化资源通过 pemalloc 分配内存，这样在请求结束的时候不会释放。对 Zend 来说，对两者本身并不区分。### ** 变量作用域 **

PHP 中的局部变量和全局变量是如何实现的？对于一个请求，任意时刻 PHP 都可以看到两个符号表（symbol_table 和 active_symbol_table)，其中前者用来维护全局变量。后者是一个指针，指向当前活动的变量符号表，当程序进入到某个函数中时，Zend 就会为它分配一个符号表 x 同时将 active_symbol_table 指向 a。通过这样的方式实现全局、局部变量的区分。获取变量值：PHP 的符号表是通过 Hash_table 实现的，对于每个变量都分配唯一标识，获取的时候根据标识从表中找到相应 zval 返回。函数中使用全局变量：在函数中，我们可以通过显式申明 global 来使用全局变量。在 active_symbol_table 中创建 symbol_table 中同名变量的引用，如果 symbol_table 中没有同名变量则会先创建。