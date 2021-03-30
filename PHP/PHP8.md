## PHP8新特性

#### 1. 命名参数

命名参数实现了我们调用函数的时候，不用严格函数的定义顺序。

```php
function test($a,$b,$c) {
    echo sprintf("a=%s,b=%s,c=%s \n",$a,$b,$c);
}
test("1",c:'2',b:"3");
test(c: 'c',b: '2',a:"1");
```

### 2. 注解

 PHP 原生语法来使用结构化的元数据

```php
#[Route("/api/posts/{id}")]
function Attribute() {
}
$ref = new ReflectionFunction("Attribute");
var_dump($ref->getAttributes("Route")[0]->getName()); //Route
var_dump($ref->getAttributes("Route")[0]->getArguments());//
```

### 3. 联合类型

联合类型 就是一个类型可以多个类型的其中一个

```php
class C
{
    private string|int $name;
    
    public function setName($name){
        $this->name = $name;
        echo $this->name.PHP_EOL;
    }
}

$c = new C();
$c->setName(1);
$c->setName("123");
$c->setName([]);//error
```

### 4. Match表达式

新的 match 类似于 switch，并具有以下功能：

- Match 是一个表达式，它可以储存到变量中亦可以直接返回。
- Match 分支仅支持单行，它不需要一个 break; 语句。
- Match 使用严格比较

```php
echo match (8.0) {
  '8.0' => "Oh no!",
  8.0 => "This is what I expected",
};
```

### 5. **字符串与数字的比较逻辑**

```php
#php8
0 == 'foobar' // false
#php7
0 == 'foobar' // true

```

### 6. JIT 即时编译

### 7. 新的类、接口、函数

- `str_contains` 字符串包含 、`str_starts_with`  以字符串开始、`str_ends_with`
