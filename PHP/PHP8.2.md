## PHP8.2的变化
- [PHP8.2](https://www.php.net/releases/8.2/zh.php)
### 只读类
使用`readonly` 修饰类名
```php
<?php 
readonly class BlogData
{
    public string $title;

    public Status $status;

    public function __construct(string $title, Status $status)
    {
        $this->title = $title;
        $this->status = $status;
    }
}
```
### 析取范式 （DNF）类型
简单的理解，就是定义参数支持交集和并集，'组合并集和交集类型时，交集类型必须用括号进行分组'
```php
class Foo {
    public function bar((A&B)|null $entity) {
        return $entity;
    }
}
```
### 允许 null、false 和 true 作为独立类型
```php

function f(): false {
  return false;
}
function f1(): true {
  return true;
}
function f2(): null {
  return null;
}
```
### 新的“随机”扩展
`\Random\Randomizer` 类提供了一个高级接口来使用引擎的随机性来生成随机整数、随机排列数组或字符串、选择随机数组键等。

### Traits 中允许常量
```php
trait T
{
    public const CONSTANT = 1;
}
```
### 弃用动态属性
动态属性的创建已被弃用，以帮助避免错误和拼写错误，除非该类通过使用 `#[\AllowDynamicProperties]` 属性来选择。`stdClass` 允许动态属性。
__get/__set 魔术方法的使用不受此更改的影响。
```php
class User
{
    public $name;
}

$user = new User();
$user->last_name = 'Doe'; // Deprecated notice

$user = new stdClass();
$user->last_name = 'Doe'; // Still allowed
```

## 弃用和向后不兼容
- 弃用 ${} 字符串插值。
- 弃用 utf8_encode 和 utf8_decode 函数。
- DateTime::createFromImmutable 和 DateTimeImmutable::createFromMutable 方法暂定返回类型为 static。
- strtolower 和 strtoupper 函数不再对语言环境敏感。
