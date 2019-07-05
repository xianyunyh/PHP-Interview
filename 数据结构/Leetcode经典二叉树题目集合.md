## :pencil2:Leetcode经典二叉树题目集合

#### php-leetcode之路 [Leetcode-php](https://github.com/wuqinqiang/leetcode-php)
****
### :pencil2:1.二叉树的前序遍历（leetcode144）

<a href="https://github.com/wuqinqiang/">
​    <img src="https://github.com/wuqinqiang/Lettcode-php/blob/master/images/144.png">
</a> 

**前序遍历，先访问根结点，然后在访问左子树，最后访问右子树。可以利用栈的特点，这里我结合了队列和栈的特点来实现。先压入树，取出根节点。先把根节点值push到队列中，然后把右子树压入栈中，最后压入左子树。返回队列。当然你可以调整成你想要的实现方式。(只要前中后序顺序理解正确即可)**

```php

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     public $val = null;
 *     public $left = null;
 *     public $right = null;
 *     function __construct($value) { $this->val = $value; }
 * }
 */

class Solution {

    /**
     * @param TreeNode $root
     * @return Integer[]
     */
    function preorderTraversal($root) {
        $res=[];
        $list=[];
        array_unshift($res,$root);
        while(!empty($res)){
           $current=array_shift($res);
           if($current==null) continue;
            array_push($list,$current->val);
            array_unshift($res,$current->right);
            array_unshift($res,$current->left);           
        }
        return $list; 
    }
}

```

****

### :pencil2:2.二叉树的中序遍历(leetcode94)

<a href="https://github.com/wuqinqiang/">
​    <img src="https://github.com/wuqinqiang/Lettcode-php/blob/master/images/94.png">
</a> 

```php
       /**
           * @param TreeNode $root
           * @return Integer[]
           */
          function inorderTraversal($root) {
              $res=[];
              $this->helper($root,$res);
              return $res;
          }
          function helper($root,&$res){
              if($root !=null){
                  if($root->left !=null) $this->helper($root->left,$res);
                  array_push($res,$root->val);
                  if($root->right !=null)  $this->helper($root->right,$res);
              }
           
          }
```

**或者不用递归**

```php
  /**
     * @param TreeNode $root
     * @return Integer[]
     */
    function inorderTraversal($root) {
        $res=[];
        $list=[];
        while(!empty($list) ||  $root !=null){
            while($root != null){
                array_unshift($list,$root);
                $root=$root->left;
            }
            $root=array_shift($list);
            array_push($res,$root->val);
            $root=$root->right;
        }
        return $res;
    }
```
****


### :pencil2:3.二叉树的后序遍历(leetcode145)

<a href="https://github.com/wuqinqiang/">
​    <img src="https://github.com/wuqinqiang/Lettcode-php/blob/master/images/145.png">
</a> 

```php
       /**
           * @param TreeNode $root
           * @return Integer[]
           */
          function postorderTraversal($root) {
             $list=[];
              $res=[];
              array_push($list,$root);
              while(!empty($list)){
                  $node=array_shift($list);
                  if(!$node) continue;
                  array_unshift($res,$node->val);
                  array_unshift($list,$node->left);
                  array_unshift($list,$node->right);
              }
              return $res;
          }
      }
```
****

### :pencil2:4.二叉树的层次遍历(leetcode102)

<a href="https://github.com/wuqinqiang/">
​    <img src="https://github.com/wuqinqiang/Lettcode-php/blob/master/images/102.png">
</a> 

**DFS和BFS都可以解，竟然已经要我们按照层打印了，那么先使用BFS，思路就是先判断树是否是空，不是空加入一个队列的结构中，如果队列不为空，取出头元素，那么当前元素表示的就是当前这一层了，所以只需要遍历这一层里的所有的元素即可，然后下一层....**

```php
      class Solution {
      
          /**
           * @param TreeNode $root
           * @return Integer[][]
           */
          function levelOrder($root) {
              if(empty($root)) return [];
              $result = [];
              $queue = [];
              array_push($queue,$root);
              while(!empty($queue)){
                  $count = count($queue);
                  $leveQueue = [];
                  for($i = 0;$i<$count;$i++){
                      $node = array_shift($queue);
                      array_push($leveQueue,$node->val);
                      if($node->left) array_push($queue,$node->left);
                      if($node->right) array_push($queue,$node->right);
                  }
                  array_push($result,$leveQueue);
              }
              return $result;
          }
      }
```

**如果使用DFS的话，就是一条路走到黑，然后再重新一路路的退回来再找下一路，所以这样的话，每一次我们需要记录一下当前他所在的这个点属于哪一层即可，代码用递归实现。**
```php

class Solution {

    /**
     * @param TreeNode $root
     * @return Integer[][]
     */
    function levelOrder($root) {
        if(empty($root)) return [];
        $result=[];
        $this->helper($result,$root,0);
        return $result;
    }
    
    function helper(&$result,$node,$level){
        if(empty($node)) return ;
        if(count($result)<$level+1){
            array_push($result,[]); //说明当前行没有结果
        }
        array_push($result[$level],$node->val);
        $this->helper($result,$node->left,$level+1);
        $this->helper($result,$node->right,$level+1);
    }
}

```
****

### :pencil2:5.二叉树的最大深度(leetcode104）

<a href="https://github.com/wuqinqiang/">
​    <img src="https://github.com/wuqinqiang/Lettcode-php/blob/master/images/104.png">
</a> 

**DFS和BFS都可以解，竟然已经要我们按照层打印了，那么先使用BFS，思路就是先判断树是否是空，不是空加入一个队列的结构中，如果队列不为空，取出头元素，那么当前元素表示的就是当前这一层了，所以只需要遍历这一层里的所有的元素即可，然后下一层....**

```php
    
 /**
     * @param TreeNode $root
     * @return Integer
     */
    function maxDepth($root) {
        if(empty($root)) return 0;
        $left = $this->maxDepth($root->left);
        $right = $this->maxDepth($root->right);
        return $left<$right?  $right+1:$left+1;
        return max($left,$right)+1;
    }
```
****

### :pencil2:6.二叉树的最小深度(leetcode111）

<a href="https://github.com/wuqinqiang/">
​    <img src="https://github.com/wuqinqiang/Lettcode-php/blob/master/images/111.png">
</a> 

**DFS和BFS都可以求解**

```php
    
 //BFS
  /**
      * @param TreeNode $root
      * @return Integer
      */
     function minDepth($root) {
        if(empty($root)) return 0;
         if(!$root->right) return $this->minDepth($root->left)+1;
         if(!$root->left) return $this->minDepth($root->right)+1;
         $left=$this->minDepth($root->left);
         $right=$this->minDepth($root->right);
         return min($left,$right)+1;
       
     }
```

```php

//DFS
 /**
     * @param TreeNode $root
     * @return Integer
     */
    function minDepth($root) {
        if(empty($root)) return 0;
           $left=$this->minDepth($root->left);
          $right=$this->minDepth($root->right);
        if($left==0 || $right==0) return $left+$right+1;
        return min($left,$right)+1;
    }
```
****


### :pencil2:7.判断是否是平衡二叉树(leetcode110）

<a href="https://github.com/wuqinqiang/">
​    <img src="https://github.com/wuqinqiang/Lettcode-php/blob/master/images/110.png">
</a> 

**每一节点的两个子树的深度相差不能超过1。如果是空树，直接true。**

```php
    
 
class Solution {

    /**
     * @param TreeNode $root
     * @return Boolean
     */
    private $result=true;
    function isBalanced($root) {
        if(empty($root)) return true;
        $this->helper($root);
        return $this->result;
    }
    function helper($root)
{
        if(!$root) return ;
        $left=$this->helper($root->left);
        $right=$this->helper($root->right);
        if(abs($left-$right)>1) $this->result=false;
        return max($left,$right)+1;
    }
}
```
****


### :pencil2:8.判断是否是对称二叉树(leetcode101）

<a href="https://github.com/wuqinqiang/">
​    <img src="https://github.com/wuqinqiang/Lettcode-php/blob/master/images/101.jpg">
</a> 

**1.两个子节点都是空,那说明他们是对称的返回true**

**2.一个子节点为空,另一个子节点不为空,false**

**3.两个子节点都不为空,但是他们不相等,false**

**4.两个子节点不为空且相等,继续判断他们的左子树和右子树,把左子树的左子节点和右子树的右子节点进行比较,把左子树的右子节点和右子树的左子节点进行比较**

```php
     /**
         * @param TreeNode $root
         * @return Boolean
         */
        function isSymmetric($root) {
          if(empty($root)) return true;
            return $this->helper($root->left,$root->right);
        }
        function helper($l,$r){
           if(!$l && !$r) return true;
            if(!$l || !$r || $l->val != $r->val) return false;
            return $this->helper($l->left ,$r->right) && $this->helper($l->right,$r->left);
        }
```
****

### :pencil2:9.反转二叉树(leetcode226）

<a href="https://github.com/wuqinqiang/">
​    <img src="https://github.com/wuqinqiang/Lettcode-php/blob/master/images/226.png">
</a> 

```php
     
    /**
     * @param TreeNode $root
     * @return TreeNode
     */
    function invertTree($root) {
        if(!$root) return null;
        $list=[];
        array_push($list,$root);
        while(!empty($list)){
            $node=array_shift($list);
            $temp=$node->left;
            $node->left=$node->right;
            $node->right=$temp;
            if($node->left) array_push($list,$node->left);
            if($node->right) array_push($list,$node->right);
        }
        return $root;
    }
```
**递归解**
```php
 /**
     * @param TreeNode $root
     * @return TreeNode
     */
    function invertTree($root) {
      if(empty($root)){
          return null;
      }
        $right=$this->invertTree($root->right);
        $left=$this->invertTree($root->left);
        $root->left=$right;
        $root->right=$left;
        return $root;
    }
```
****


### :pencil2:10.给定单链表(值有序)转化成平衡二叉查找树(leetcode109）

<a href="https://github.com/wuqinqiang/">
​    <img src="https://github.com/wuqinqiang/Lettcode-php/blob/master/images/109.png">
</a> 

**先将链表数据转换成有序数组，然后利用二分查找的特性，构建左右子树。**

```php
   
/**
 * Definition for a singly-linked list.
 * class ListNode {
 *     public $val = 0;
 *     public $next = null;
 *     function __construct($val) { $this->val = $val; }
 * }
 */
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     public $val = null;
 *     public $left = null;
 *     public $right = null;
 *     function __construct($value) { $this->val = $value; }
 * }
 */
class Solution {

    /**
     * @param ListNode $head
     * @return TreeNode
     */
    function sortedListToBST($head) {
        $data=[];
        while($head){
            array_push($data,$head->val);
            $head=$head->next;
        }
        return $this->helper($data);
    }
    
    function helper($data)
{
        if(!$data) return ;
        $middle=floor(count($data)/2);
        $node=new TreeNode($data[$middle]);
        $node->left=$this->helper(array_slice($data,0,$middle));
        $node->right=$this->helper(array_slice($data,$middle+1));
        return $node;
    }
}
```
****


### :pencil2:11.强盗打劫版本3(leetcode337）

<a href="https://github.com/wuqinqiang/">
​    <img src="https://github.com/wuqinqiang/Lettcode-php/blob/master/images/337.png">
</a> 

**最后的目的算出最多能抢金额数而不触发报警器。除了根节点，每一个结点只有一个父节点，能直接相连的两个节点不能同时抢，比如图1，抢了根节点，直接相连的左右子结点就不能抢。所以要么抢根节点的左右子结点，要么根结点+根结点->left->right+根结点->right->right。**


```php
   
//递归  
/**
     * @param TreeNode $root
     * @return Integer
     */
    function rob($root) {
        if($root==null){
            return 0;
        }
        $res1=$root->val;
        if($root->left !=null) {
            $res1 +=$this->rob($root->left->left)+$this->rob($root->left->right);
        }
        if($root->right !=null){
            $res1 +=$this->rob($root->right->left)+$this->rob($root->right->right);
        }
        
        $res2=$this->rob($root->left)+$this->rob($root->right);
        return max($res1,$res2);
    
    }
```

**上面那种大量的重复计算,改进一下。**

 **如果结点不存在直接返回0，对左右结点分别递归，设置了4个变量，ll和lr分别表示左子结点的左右子结点的最大金额数，rl和rr分别表示右子结点的左右子结点的最大金额数。所以我们最后比较的还是两种情况，第一种就是当前结点+左右子结点的左右子结点的值(即这里定义的ll,lr,rl,rr).第二种是当前结点的左右子结点的值(也就是说我只抢当前结点的子结点，不抢当前结点和孙子结点)，再通俗的说就是如果树的层数是3层，要么抢中间一层，要么抢上下两层，谁钱多抢谁。**
 
 ```php
/**
     * @param TreeNode $root
     * @return Integer
     */
    function rob($root) {
       $l=0;$r=0;
        return $this->countMax($root,$l,$r);
    }
    function countMax($root,&$l,&$r){
        if($root==null) return 0;
        $ll=0;$lr=0;$rl=0;$rr=0;
        $l=$this->countMax($root->left,$ll,$lr);
        $r=$this->countMax($root->right,$rl,$rr);
        return max($root->val+$ll+$lr+$rl+$rr,$l+$r);
    }
```
****

### :pencil2:12.判断二叉树路径和是否存在(leetcode112）

<a href="https://github.com/wuqinqiang/">
​    <img src="https://github.com/wuqinqiang/Lettcode-php/blob/master/images/112.png">
</a> 

**只要使用深度优先算法思想遍历每一条完整的路径，如果是个空树直接false，如果结点没有左右子树(说明此时已然是叶子结点，判断值是否是给定值，这个条件正好是递归终止的条件)，相等直接返回true，根据这个推导出递归公式。**

```php
/**
     * @param TreeNode $root
     * @param Integer $sum
     * @return Boolean
     */
    function hasPathSum($root, $sum) {
        if($root==null){
            return false;
        }
        if($root->left ==null && $root->right==null && $root->val==$sum) return true;
        return $this->hasPathSum($root->left,$sum-$root->val) || $this->hasPathSum($root->right,$sum-$root->val);
    }
```

**改成迭代**

```php

/**
     * @param TreeNode $root
     * @param Integer $sum
     * @return Boolean
     */
    function hasPathSum($root, $sum) {
        if($root==null){
            return false;
        }
        $res=[];
        array_push($res,$root);
        while(!empty($res)){
            $node=array_shift($res);
            if(!$node->left && !$node->right ){
                if($node->val==$sum) return true;
            }
            if($node->left){
                $node->left->val +=$node->val;
                array_push($res,$node->left);
            }
            if($node->right){
                $node->right->val +=$node->val;
                array_push($res,$node->right);
            }
        }
        return false; 
    }
```
****


### :pencil2:13.判断是否是二叉查找树(leetcode98）

<a href="https://github.com/wuqinqiang/">
​    <img src="https://github.com/wuqinqiang/Lettcode-php/blob/master/images/98.png">
</a> 

**思路有两种，二叉查找树的特点就是左子树上的结点都小于根结点，右子树上的结点都大于根节点。所以有两个方向，可以分别递归的判断左子树，右子树。或者拿左子树上的最大值，右子树上的最小值分别对应根结点进行判断。**

```php
   
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     public $val = null;
 *     public $left = null;
 *     public $right = null;
 *     function __construct($value) { $this->val = $value; }
 * }
 */
class Solution {

    /**
     * @param TreeNode $root
     * @return Boolean
     */
    function isValidBST($root) {
       return $this->helper($root,null,null);
    }
    function helper($root,$lower,$upper){
        if($root==null) return true;
        $res=$root->val;
        if($lower !==null && $res<=$lower) return false;
        if($upper !==null && $res>=$upper) return false;
        if(!$this->helper($root->left,$lower,$res)) return false;
        if(!$this->helper($root->right,$res,$upper)) return false;
        return true;
    }
}
```
****


### :pencil2:14.找出二叉树最后一层最左边的值(leetcode513）

<a href="https://github.com/wuqinqiang/">
​    <img src="https://github.com/wuqinqiang/Lettcode-php/blob/master/images/513.png">
</a> 

**思路有两种，二叉查找树的特点就是左子树上的结点都小于根结点，右子树上的结点都大于根节点。所以有两个方向，可以分别递归的判断左子树，右子树。或者拿左子树上的最大值，右子树上的最小值分别对应根结点进行判断。**

```php
   /**
     * @param TreeNode $root
     * @return Integer
     */
    function findBottomLeftValue($root) {
       $data=[];
        array_push($data,$root);
        while(!empty($data)){
            $node = array_shift($data);
            if($node->right) array_push($data,$node->right);
            if($node->left) array_push($data,$node->left);
        }
        return $node->val;
    }
```
****

### 联系

<a href="https://github.com/wuqinqiang/">
​    <img src="https://github.com/wuqinqiang/Lettcode-php/blob/master/qrcode_for_gh_c194f9d4cdb1_430.jpg" width="150px" height="150px">
</a> 

    
    
    

