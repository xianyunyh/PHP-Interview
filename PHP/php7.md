php7发布已经升级到7.2.里面发生了很多的变化。本文整理php7.0至php7.2的新特性和一些变化。

参考资料：

http://php.net/manual/zh/migration70.new-features.php

http://php.net/manual/zh/migration71.new-features.php

http://php.net/manual/zh/migration72.new-features.php

## PHP7.0

### PHP7.0新特性

#### 1. 组合比较符 (<=>)

组合比较符号用于比较两个表达式。当$a小于、等于或大于$b时它分别返回-1、0或1，比较规则延续常规比较规则。对象不能进行比较

```php
var_dump('PHP' <=> 'Node'); // int(1)
var_dump(123 <=> 456); // int(-1)
var_dump(['a', 'b'] <=> ['a', 'b']); // int(0)
```

#### 2. null合并运算符

由于日常使用中存在大量同时使用三元表达式和isset操作。使用null合并运算符可以简化操作

```php
# php7以前
if(isset($_GET['a'])) {
  $a = $_GET['a'];
}
# php7以前
$a = isset($_GET['a']) ? $_GET['a'] : 'none';

#PHP 7
$a = $_GET['a'] ?? 'none';

```

#### 4. 变量类型声明

变量类型声明有两种模式。一种是强制的，和严格的。允许使用下列类型参数**int**、**string**、**float**、**bool**

同时不能再使用int、string、float、bool作为类的名字了

```php
function sumOfInts(int ...$ints)
{
    return array_sum($ints);
}
var_dump(sumOfInts(2, '3', 4.1)); // int(9)
# 严格模式
declare(strict_types=1);

function add(int $x, int $y)
{
    return $x + $y;
}
var_dump(add('2', 3)); // Fatal error: Argument 1 passed to add() must be of the type integer
```

#### 5. 返回值类型声明

增加了返回类型声明，类似参数类型。这样更方便的控制函数的返回值.在函数定义的后面加上:类型名即可

```php
function fun(int $a): array
{
  return $a;
}
fun(3);//Fatal error
```

#### 6. 匿名类

php7允许new class {} 创建一个匿名的对象。

```php
//php7以前
class Logger
{
    public function log($msg)
    {
        echo $msg;
    }
}

$util->setLogger(new Logger());

// php7+
$util->setLogger(new class {
    public function log($msg)
    {
        echo $msg;
    }
});
```

#### 7. Unicode codepoint 转译语法

这接受一个以16进制形式的 Unicode codepoint，并打印出一个双引号或heredoc包围的 UTF-8 编码格式的字符串。 可以接受任何有效的 codepoint，并且开头的 0 是可以省略的

```PHP
echo "\u{aa}";// ª
echo "\u{0000aa}";// ª
echo "\u{9999}";// 香
```

#### 8. Closure::call

闭包绑定 简短干练的暂时绑定一个方法到对象上闭包并调用它。

```php
class A {private $x = 1;}

// PHP 7 之前版本的代码
$getXCB = function() {return $this->x;};
$getX = $getXCB->bindTo(new A, 'A'); // 中间层闭包
echo $getX();

// PHP 7+ 及更高版本的代码
$getX = function() {return $this->x;};
echo $getX->call(new A);
```

#### 9. 带过滤的unserialize

提供更安全的方式解包不可靠的数据。它通过白名单的方式来防止潜在的代码注入

```php
// 将所有的对象都转换为 __PHP_Incomplete_Class 对象
$data = unserialize($foo, ["allowed_classes" => false]);

// 将除 MyClass 和 MyClass2 之外的所有对象都转换为 __PHP_Incomplete_Class 对象
$data = unserialize($foo, ["allowed_classes" => ["MyClass", "MyClass2"]);

// 默认情况下所有的类都是可接受的，等同于省略第二个参数
$data = unserialize($foo, ["allowed_classes" => true]);
```

#### 10. IntlChar类

这个类自身定义了许多静态方法用于操作多字符集的 unicode 字符。需要安装intl拓展

```php

printf('%x', IntlChar::CODEPOINT_MAX);
echo IntlChar::charName('@');
var_dump(IntlChar::ispunct('!'));
```

#### 11. 预期

它使得在生产环境中启用断言为零成本，并且提供当断言失败时抛出特定异常的能力。以后可以使用这个这个进行断言测试

```php
ini_set('assert.exception', 1);

class CustomError extends AssertionError {}

assert(false, new CustomError('Some error message'));
```

#### 12. 命名空间按组导入

从同一个命名空间下导入的类、函数、常量支持按组一次导入

```php
#php7以前
use app\model\A;
use app\model\B;
#php7+
use app\model{A,B}
```

#### 13.生成器支持返回表达式

 它允许在生成器函数中通过使用 *return* 语法来返回一个表达式 （但是不允许返回引用值）， 可以通过调用 *Generator::getReturn()* 方法来获取生成器的返回值， 但是这个方法只能在生成器完成产生工作以后调用一次。

```php
$gen = (function() {
    yield 1;
    yield 2;

    return 3;
})();

foreach ($gen as $val) {
    echo $val, PHP_EOL;
}

echo $gen->getReturn(), PHP_EOL;
# output
//1
//2
//3
```

#### 14.生成器委派

现在，只需在最外层生成其中使用yield from，就可以把一个生成器自动委派给其他的生成器

```php
function gen()
{
    yield 1;
    yield 2;

    yield from gen2();
}

function gen2()
{
    yield 3;
    yield 4;
}

foreach (gen() as $val)
{
    echo $val, PHP_EOL;
}
```

#### 15.整数除法函数intdiv

```php
var_dump(intdiv(10,3)) //3
```

#### 16.会话选项设置

session_start() 可以加入一个数组覆盖php.ini的配置

```php
session_start([
    'cache_limiter' => 'private',
    'read_and_close' => true,
]);
```

#### 17. preg_replace_callback_array

可以使用一个关联数组来对每个正则表达式注册回调函数， 正则表达式本身作为关联数组的键， 而对应的回调函数就是关联数组的值

```php
string preg_replace_callback_array(array $regexesAndCallbacks, string $input);
$tokenStream = []; // [tokenName, lexeme] pairs

$input = <<<'end'
$a = 3; // variable initialisation
end;

// Pre PHP 7 code
preg_replace_callback(
    [
        '~\$[a-z_][a-z\d_]*~i',
        '~=~',
        '~[\d]+~',
        '~;~',
        '~//.*~'
    ],
    function ($match) use (&$tokenStream) {
        if (strpos($match[0], '$') === 0) {
            $tokenStream[] = ['T_VARIABLE', $match[0]];
        } elseif (strpos($match[0], '=') === 0) {
            $tokenStream[] = ['T_ASSIGN', $match[0]];
        } elseif (ctype_digit($match[0])) {
            $tokenStream[] = ['T_NUM', $match[0]];
        } elseif (strpos($match[0], ';') === 0) {
            $tokenStream[] = ['T_TERMINATE_STMT', $match[0]];
        } elseif (strpos($match[0], '//') === 0) {
            $tokenStream[] = ['T_COMMENT', $match[0]];
        }
    },
    $input
);

// PHP 7+ code
preg_replace_callback_array(
    [
        '~\$[a-z_][a-z\d_]*~i' => function ($match) use (&$tokenStream) {
            $tokenStream[] = ['T_VARIABLE', $match[0]];
        },
        '~=~' => function ($match) use (&$tokenStream) {
            $tokenStream[] = ['T_ASSIGN', $match[0]];
        },
        '~[\d]+~' => function ($match) use (&$tokenStream) {
            $tokenStream[] = ['T_NUM', $match[0]];
        },
        '~;~' => function ($match) use (&$tokenStream) {
            $tokenStream[] = ['T_TERMINATE_STMT', $match[0]];
        },
        '~//.*~' => function ($match) use (&$tokenStream) {
            $tokenStream[] = ['T_COMMENT', $match[0]];
        }
    ],
    $input
);
```

#### 18. 随机数、随机字符函数

```php
string random_bytes(int length);
int random_int(int min, int max);
```

#### 19. define 支持定义数组

```php
#php7+
define('ALLOWED_IMAGE_EXTENSIONS', ['jpg', 'jpeg', 'gif', 'png']);
```

### PHP7.0 变化

#### 1. 错误和异常处理相关变更

PHP 7 改变了大多数错误的报告方式。不同于传统（PHP 5）的错误报告机制，现在大多数错误被作为 **Error** 异常抛出。

这也意味着，当发生错误的时候，以前代码中的一些错误处理的代码将无法被触发。 因为在 PHP 7 版本中，已经使用抛出异常的错误处理机制了。 （如果代码中没有捕获 **Error** 异常，那么会引发致命错误）。set_error_handle不一定接收的是异常，有可能是错误。

ERROR层级结构

```
interface Throwable
    |- Exception implements Throwable
        |- ...
    |- Error implements Throwable
        |- TypeError extends Error
        |- ParseError extends Error
        |- AssertionError extends Error
        |- ArithmeticError extends Error
            |- DivisionByZeroError extends ArithmeticError
```

```php
function handler(Exception $e) { ... }
set_exception_handler('handler');

// 兼容 PHP 5 和 7
function handler($e) { ... }

// 仅支持 PHP 7
function handler(Throwable $e) { ... }
```

#### 2. list

list 会按照原来的顺序进行赋值。不再是逆序了

```php
list($array[], $array[], $array[]) = [1, 2, 3];
var_dump($array); // [1, 2, 3]
```

list不再支持解开字符串、

#### 3. foreach不再改变内部数组指针

```php
<?php
$array = [0, 1, 2];
foreach ($array as &$val) {
    var_dump(current($array));
}
?>
#php 5
int(1)
int(2)
bool(false)
#php7
int(0)
int(0)
int(0)
```

#### 4. 十六进制字符串不再被认为是数字

```php
var_dump("0x123" == "291");
#php5
true
#php7
false
  
```

#### 5.$HTTP_RAW_POST_DATA 被移 

$HTTP_RAW_POST_DATA 被移 使用`php://input`代替

#### 6. 移除了 ASP 和 script PHP 标签

| 开标签                       | 闭标签         |
| ------------------------- | ----------- |
| `<%`                      | `%>`        |
| `<%=`                     | `%>`        |
| `<script language="php">` | `</script>` |

## PHP7.1

### PHP7.1新特性

#### 1. 可为空（Nullable）类型

参数以及返回值的类型现在可以通过在类型前加上一个问号使之允许为空。当启用这个特性时，传入的参数或者函数返回的结果要么是给定的类型，要么是null

```php
#php5
function($a = null){
  if($a===null) {
    return null;
  }
  return $a;
}
#php7+
function fun() :?string
{
  return null;
}

function fun1(?$a)
{
  var_dump($a);
}
fun1(null);//null
fun1('1');//1

```

#### 2. void 类型

返回值声明为 void 类型的方法要么干脆省去 return 语句。对于 void来说，**NULL** 不是一个合法的返回值。

```php
function fun() :void
{
  echo "hello world";
}
```

#### 3. 类常量可见性

```php
class Something
{
    const PUBLIC_CONST_A = 1;
    public const PUBLIC_CONST_B = 2;
    protected const PROTECTED_CONST = 3;
    private const PRIVATE_CONST = 4;
}
```

#### 4. iterable 伪类

这可以被用在参数或者返回值类型中，它代表接受数组或者实现了**Traversable**接口的对象.

```php
function iterator(iterable $iter)
{
    foreach ($iter as $val) {
        //
    }
}
```

#### 5. 多异常捕获处理

一个catch语句块现在可以通过管道字符(*|*)来实现多个异常的捕获。 这对于需要同时处理来自不同类的不同异常时很有用

```php
try {
    // some code
} catch (FirstException | SecondException $e) {
    // handle first and second exceptions
}
```

#### 6. list支持键名

```php
$data = [
    ["id" => 1, "name" => 'Tom'],
    ["id" => 2, "name" => 'Fred'],
];

// list() style
list("id" => $id1, "name" => $name1) = $data[0];
var_dump($id1);//1
```

#### 7. 字符串支持负向

```php
$a= "hello";
$a[-2];//l
```

#### 8. 将callback 转闭包

Closure新增了一个静态方法，用于将callable快速地 转为一个Closure 对象。

```php
<?php
class Test
{
    public function exposeFunction()
    {
        return Closure::fromCallable([$this, 'privateFunction']);
    }

    private function privateFunction($param)
    {
        var_dump($param);
    }
}

$privFunc = (new Test)->exposeFunction();
$privFunc('some value');
```

#### 9. http2 服务推送

对http2服务器推送的支持现在已经被加入到 CURL 扩展

### PHP7.1变更

#### 1. 传递参数过少时将抛出错误

过去我们传递参数过少 会产生warning。php7.1开始会抛出error

#### 2. 移除了ext/mcrypt拓展



## PHP7.2

### PHP7.2新特性

#### 1. 增加新的类型object

```php
function test(object $obj) : object
{
    return new SplQueue();
}

test(new StdClass());
```

#### 2. 通过名称加载扩展

扩展文件不再需要通过文件加载 (Unix下以*.so*为文件扩展名，在Windows下以 *.dll* 为文件扩展名) 进行指定。可以在php.ini配置文件进行启用

```ini
; ini file
extension=php-ast
zend_extension=opcache
```

#### 3.允许重写抽象方法

当一个抽象类继承于另外一个抽象类的时候，继承后的抽象类可以重写被继承的抽象类的抽象方法。

```php
<?php

abstract class A
{
    abstract function test(string $s);
}
abstract class B extends A
{
    // overridden - still maintaining contravariance for parameters and covariance for return
    abstract function test($s) : int;
}
```

#### 4. 使用Argon2算法生成密码散列

Argon2 已经被加入到密码散列（password hashing） API (这些函数以 *password_* 开头), 以下是暴露出来的常量

#### 5. 新增 PDO 字符串扩展类型

当你准备支持多语言字符集，PDO的字符串类型已经扩展支持国际化的字符集。以下是扩展的常量：

- **PDO::PARAM_STR_NATL**
- **PDO::PARAM_STR_CHAR**
- **PDO::ATTR_DEFAULT_STR_PARAM**

```php
$db->quote('über', PDO::PARAM_STR | PDO::PARAM_STR_NATL);
```

#### 6. 命名分组命名空间支持尾部逗号

```php
use Foo\Bar\{
    Foo,
    Bar,
    Baz,
};
```

### PHP7.2 变更

#### 1. number_format 返回值

```php
var_dump(number_format(-0.01)); // now outputs string(1) "0" instead of string(2) "-0"
```

#### 2. get_class()不再允许null。

```php
var_dump(get_class(null))// warning
```

#### 4. count 作用在不是 Countable Types 将发生warning

```php
count(1), // integers are not countable
```

#### 5. 不带引号的字符串

在之前不带引号的字符串是不存在的全局常量，转化成他们自身的字符串。现在将会产生waring。

```php
var_dump(HEELLO);
```

#### 6. __autoload 被废弃

__autoload方法已被废弃

#### 7. each 被废弃

使用此函数遍历时，比普通的 *foreach* 更慢， 并且给新语法的变化带来实现问题。因此它被废弃了。

#### 8. is_object、gettype修正

is_object 作用在**__PHP_Incomplete_Class** 将反正 true

gettype作用在闭包在将正确返回resource

#### 9. Convert Numeric Keys in Object/Array Casts

把数组转对象的时候，可以访问到整型键的值。

```php
// array to object
$arr = [0 => 1];
$obj = (object)$arr;
var_dump(
    $obj,
    $obj->{'0'}, // now accessible
    $obj->{0} // now accessible
);
```

## PHP 7.3

#### 1. 灵活的heredoc 和nowdoc

在php 7.3 之前我们定义一大段的字符串。需要用到heredoc

```php
<?php 
    $a = <<<H
    hello world
H;
    
```

结束标记必须在新行的开头。在php7.3 我们可以就不用受那个限制了

```php
<?php
    $a = <<<H
    hello world
    H;
```

### 2. 函数后面支持尾逗号

```php
function fn($a,$b,$c)
{
    
}

fn(1,2,3,)//最后一个参数后面可以加逗号

```

### 3. JSON_THROW_ON_ERROR

在php3 之前我们解析json的时候，`json_decode` 、`json_encode` 会返回失败 我们会通过json_last_error 获取错误的信息 。在php7.3 我们可以通过异常来获取



```php
#php 7.3 之前

$res = json_decode($jsonString,true);
if(json_last_error() !== JSON_ERROR_NONE) {
    echo json_last_error_msg();
}
# php 7.3

try{
    json_decode("invalid json", null, 512, JSON_THROW_ON_ERROR);

}catch($e){
    
}
```



### 4. is_countable 函数

 在 PHP 7.2 中，用 count() 获取对象和数组的数量。如果对象不可数，PHP 会抛出警告⚠️ 。所以需要检查对象或者数组是否可数。 PHP 7.3 提供新的函数 is_countable() 来解决这个问题。

该 RFC 提供新的函数 is_countable()，对数组类型或者实现了 `Countable` 接口的实例的变量返回 true 。

之前:

```php
if (is_array($foo) || $foo instanceof Countable) {
   // $foo 是可数的
}
```

之后:

```php
if (is_countable($foo)) {
   // $foo 是可数的
}
```

### 5. 新增数组函数 array_key_first(), array_key_last()

```php
$array = ['a'=>'1','b'=>'2'];
#php 7.3之前
$firstKey  = key(reset($array));
# php 7.3
$firstKey = array_key_first($array);//a
$lastKey = array_key_last($array);//b
```

### 6.废除并移除大小写不敏感的常量

你可以同时使用大小写敏感和大小写不敏感的常量。但大小写不敏感的常量会在使用中造成一点麻烦。所以，为了解决这个问题，PHP 7.3 废弃了大小写不敏感的常量。 

原先的情况是：

- 类常量始终为「大小写敏感」。
- 使用 `const` 关键字定义的全局常量始终为「大小写敏感」。注意此处仅仅是常量自身的名称，不包含命名空间名的部分，PHP 的命名空间始终为「大小写不敏感」。
- 使用 `define()` 函数定义的常量默认为「大小写敏感」。
- 使用 `define()` 函数并将第三个参数设为 `true` 定义的常量为「大小写不敏感」。

如今 PHP 7.3 提议废弃并移除以下用法：

- In PHP 7.3: 废弃使用 `true` 作为 `define()` 的第三个参数。
- In PHP 7.3: 废弃使用与定义时的大小写不一致的名称，访问大小写不敏感的常量。`true`、`false` 以及 `null` 除外。