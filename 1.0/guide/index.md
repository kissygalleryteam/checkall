## 综述

Checkall是用于非常常见的全选功能的组件。支持多层嵌套的全选功能。

* 版本：1.0
* 作者：yinruo.nyj
* demo：[http://gallery.kissyui.com/checkall/1.0/demo/index.html](http://gallery.kissyui.com/checkall/1.0/demo/index.html)

## 初始化组件
		
    S.use('gallery/checkall/1.0/index', function (S, Checkall) {
         var checkall = new Checkall({
            container: '.J_Container', // 用于指定组件的范围
            checkAll: '.J_CheckAll', // 全选按钮的钩子
            checkItem: '.J_CheckItem', // 子选框的钩子
         });
    });

参数就三个，如上注释中说明。注意`checkAll`和`checkItem`必须是selector，因为代码中使用了委托来限定目标。
