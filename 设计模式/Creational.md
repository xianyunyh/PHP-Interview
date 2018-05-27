## 工厂模式

### 1. 简单工厂

简单工厂就是一个工厂，只创建一个单一的类。不能创建其他的类，这就是简单工厂

```php
class Factory {
    
    public function create()
    {
        return new A();
    }
}

```

这个简单的工厂只能创建A类。

### 2. 工厂方法

- [模式动机](http://design-patterns.readthedocs.io/zh_CN/latest/creational_patterns/factory_method.html#id16)

关于工厂模式的定义动机可以查阅[工厂模式](http://design-patterns.readthedocs.io/zh_CN/latest/creational_patterns/factory_method.html#id17)。

我只写下自己的理解

有些时候，我们需要一个工厂创建不同的产品。比如军工厂既能创建子弹，又能创建枪。

工厂方法模式包含如下角色：

- Product：抽象产品
- ConcreteProduct：具体产品
- Factory：抽象工厂
- ConcreteFactory：具体工厂

![../_images/FactoryMethod.jpg](http://design-patterns.readthedocs.io/zh_CN/latest/_images/FactoryMethod.jpg) 



```php
interface Ifactory{
    public function create($type);
}

class Factory implements Ifactory{
    public function create($type){
        if($type == 'A') {
            return new A();
        } else if($type == 'B') {
            return new B();
        }
    }    
}
```

### 3. 抽象工厂

[抽象工厂详细介绍](http://design-patterns.readthedocs.io/zh_CN/latest/creational_patterns/abstract_factory.html)

简单的个人理解：抽象工厂是为了创建不同的类型的产品。抽象出工厂。让不同的工厂创建不同的产品

举个例子。比如抽象军工厂。军工厂A生产枪，军工厂B生产子弹。

![../_images/AbatractFactory.jpg](http://design-patterns.readthedocs.io/zh_CN/latest/_images/AbatractFactory.jpg) 

代码可以参考

[https://github.com/domnikl/DesignPatternsPHP/blob/master/Creational/AbstractFactory](https://github.com/domnikl/DesignPatternsPHP/blob/master/Creational/AbstractFactory)