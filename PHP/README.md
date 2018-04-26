## PHP手册笔记

- [手册笔记](https://github.com/xianyunyh/studynotes/tree/master/PHP/PHP%E6%89%8B%E5%86%8C%E7%AC%94%E8%AE%B0)

- [官方文档](http://php.net/manual/zh/langref.php)



### Zval 引用计数

在php5中，每个变量都存在一个叫zval的结构中，这个结构包括变量的类型和变量的值。第一个是is_ref,表示是不是引用集合，php通过这个把引用变量和普通变量区分开，还有一个字段叫`ref_count` 表示这个zval容器的个数。 

PHP5

```c_cpp
struct _zval_struct {
	union {
		long lval;
		double dval;
		struct {
			char *val;
			int len;
		} str;
		HashTable *ht;
		zend_object_value obj;
		zend_ast *ast;
	} value;
	zend_uint refcount__gc;
	zend_uchar type;
	zend_uchar is_ref__gc;
};
```

复合类型的变量把他们的成员属性都存在自己的符号表里。

```pph
<?php
$a = array( 'meaning' => 'life', 'number' => 42 );
xdebug_debug_zval( 'a' );
?>
a: (refcount=1, is_ref=0)=array (
   'meaning' => (refcount=1, is_ref=0)='life',
   'number' => (refcount=1, is_ref=0)=42
)
```

### 回收周期

我们先要建立一些基本规则，如果一个引用计数增加，它将继续被使用，当然就不再在垃圾中。如果引用计数减少到零，所在变量容器将被清除(free)。就是说，仅仅在引用计数减少到非零值时，才会产生垃圾周期(garbage cycle)。其次，在一个垃圾周期中，通过检查引用计数是否减1，并且检查哪些变量容器的引用次数是零，来发现哪部分是垃圾


