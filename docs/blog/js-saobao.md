# js骚包操作


> 使用void 0 来代替 undefined 
>> 在ES5之前，window下的undefined是可以被重写的，于是导致了某些极端情况下使用undefined会出现一定的差错。
>> void 运算符 对给定的表达式进行求值，然后返回 undefined。

> 获取整型
>> parseInt(num, 10)
>> num >> 0
>> ~~num