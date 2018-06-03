## 行为型设计模式

### 1. 观察者模式

> Behavioral定义对象间一种一对多的依赖关系，使得当一个对象改变状态，则所有依赖于它的对象都会得到通知并被自动更新。 

Subject 被观察者。是一个接口或者是抽象类，定义被观察者必须实现的职责，它必须能偶动态地增加、取消观察者，管理观察者并通知观察者。

Observer 观察者。观察者接收到消息后，即进行 update 更新操作，对接收到的信息进行处理。

ConcreteSubject 具体的被观察者。定义被观察者自己的业务逻辑，同时定义对哪些事件进行通知。

ConcreteObserver 具体观察者。每个观察者在接收到信息后处理的方式不同，各个观察者有自己的处理逻辑。



观察者模式简单的理解，就是当一个类改变的时候，通知另外一个类进行做出处理。比如我们用户在注册成功的时候，会发送短信提醒。我们可以利用观察者模式，实现应用的解耦。

```php
//抽象主题类  
interface Subject  
{  
    public function attach(Observer $Observer);  
  
    public function detach(Observer $observer);  
  
    //通知所有注册过的观察者对象  
    public function notifyObservers();  
}  
  
//具体主题角色  
  
  
class ConcreteSubject implements Subject  
{  
    private $_observers;  
  
    public function __construct()  
    {  
        $this->_observers = array();  
    }  
  
    //增加一个观察者对象  
    public function attach(Observer $observer)  
    {  
        return array_push($this->_observers,$observer);  
    }  
  
    //删除一个已经注册过的观察者对象  
      
    public function detach(Observer $observer)  
    {  
        $index = array_search($observer,$this->_observers);  
        if($index === false || !array_key_exists($index, $this->_observers)) 
            return false;  
        unset($this->_observers[$index]);  
        return true;  
    }  
  
    //通知所有注册过的观察者  
    public function notifyObservers()  
    {  
        if(!is_array($this->_observers)) return false;  
        foreach($this->_observers as $observer)  
        {  
            $observer->update();  
        }  
        return true;  
    }  
}  
  
  
//抽象观察者角色  
  
interface Observer  
{  
    //更新方法  
    public function update();  
}  
  
//观察者实现  
class ConcreteObserver implements Observer  
{  
    private $_name;  
  
    public function __construct($name)  
    {  
        $this->_name = $name;  
    }  
  
    //更新方法  
      
    public function update()  
    {  
        echo 'Observer'.$this->_name.' has notify';  
    }  
}

$Subject = new ConcreteSubject();  
  
//添加第一个观察者  
  
$observer1 = new ConcreteObserver('baixiaoshi');  
$Subject->attach($observer1);  
echo 'the first notify:';  
$Subject->notifyObservers();  
  
//添加第二个观察者  
$observer2 = new ConcreteObserver('hurong');  
echo '<br/>second notify:';  
$Subject->attach($observer2);  
  
```

- 利用SPLObserver 和SplSubject

```php
SplSubject {
    /* 方法 */
    abstract public void attach ( SplObserver $observer )
    abstract public void detach ( SplObserver $observer )
    abstract public void notify ( void )
}
SplObserver {
	/* 方法 */
	abstract public void update ( SplSubject $subject )
}
```

```php
/**
* Subject,that who makes news
*/
class Newspaper implements \SplSubject{
    private $name;
    private $observers = array();
    private $content;
    
    public function __construct($name) {
        $this->name = $name;
    }

    //add observer
    public function attach(\SplObserver $observer) {
        $this->observers[] = $observer;
    }
    
    //remove observer
    public function detach(\SplObserver $observer) {
        
        $key = array_search($observer,$this->observers, true);
        if($key){
            unset($this->observers[$key]);
        }
    }
    
    //set breakouts news
    public function breakOutNews($content) {
        $this->content = $content;
        $this->notify();
    }
    
    public function getContent() {
        return $this->content." ({$this->name})";
    }
    
    //notify observers(or some of them)
    public function notify() {
        foreach ($this->observers as $value) {
            $value->update($this);
        }
    }
}

/**
* Observer,that who recieves news
*/
class Reader implements SplObserver{
    private $name;
    
    public function __construct($name) {
        $this->name = $name;
    }
    
    public function update(\SplSubject $subject) {
        echo $this->name.' is reading breakout news <b>'.$subject->getContent().'</b><br>';
    }
}

$newspaper = new Newspaper('Newyork Times');

$allen = new Reader('Allen');
$jim = new Reader('Jim');
$linda = new Reader('Linda');

//add reader
$newspaper->attach($allen);
$newspaper->attach($jim);
$newspaper->attach($linda);

//remove reader
$newspaper->detach($linda);

//set break outs
$newspaper->breakOutNews('USA break down!');
```



## 参考资料

- [http://php.net/manual/zh/class.splobserver.php#112587](http://php.net/manual/zh/class.splobserver.php#112587)
- [http://designpatternsphp.readthedocs.io/en/latest/Behavioral/Observer/README.html](http://designpatternsphp.readthedocs.io/en/latest/Behavioral/Observer/README.html)

