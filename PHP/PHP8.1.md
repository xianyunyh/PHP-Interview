PHP8.1在2021年11月25日发布了。又带来了很多很特性和性能改进。

##　枚举
Enum 只支持整型和字符串两种类型
```php
enum Status: int {
  case SUCCESS = 0 
  case ERROR = 1
}

function test (Status $status) {
  
}
test(Status::SUCCESS)
```

### 枚举属性和方法

枚举有两个属性 `name` 、`value`
```php
  $status->name;
  $status->value;
```
Enum 提供了 from () 方法来通过选项 value 的值来获取对应的选项

```php
dump(Status::from(0));

```

## 数组解包
```php
$array_1 = [
    'key1' => 'foo', 
    'key2' => 'bar'
];
$array_2 = [
    'key3' => 'baz', 
    'key4' => 'qux'
];

$array_unpacked = [...$array_1, ...$array_2];
dd($array_unpacked);
```
新增`array_is_list ` 判断是否是从 0 开始递增的数字数组
```php
dump(array_is_list(['apple', 'orange']));
```

## 类相关

### 只读属性readonly

只读属性只允许初始化一次，修改 readonly 属性就会报错，只能在类的内部使用。

```php
class User {
    public readonly int $uid;

    public function __construct(int $uid) {
        $this->uid = $uid;
    }
}
$user = new User(12)
$user->uid = 1;//error
```
### final 类常量

```php
class Foo {
    final public const TEST = '1';
}

```

## 函数相关

1. First-class Callable

```php
$callable = strtoupper(...);
echo $callable('hello, world') . PHP_EOL; 
```
2. Never 返回类型

```php
function redirect(string $url): never {
    header('Location: ' . $url);
    exit();
}
```
