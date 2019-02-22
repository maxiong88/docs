
# 判断浏览器 滚动条宽度

> 创建一个空div 设置出现滚动条
> 添加class
> 获取宽度
> 移除

getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置

clientWidth() 属性表示元素的内部宽度，以像素计。该属性包括内边距，但不包括垂直滚动条（如果有）、边框和外边距。

offsetWidth 是指对象自身的宽度，整型，单位像素（含边线，如滚动条的占用的宽，值会随着内容的输入而不断改变）。

.modal-scrollbar-measure {
    position: absolute;
    top: -9999px;
    width: 50px;
    height: 50px;
    overflow: scroll
}

// 兼容ie 9+
function _getScrollbarWidth(){
	var t = document.createElement('div');
	t.className = "modal-scrollbar-measure";
	document.body.appendChild(t);
	var e = t.getBoundingClientRect().width - t.clientWidth;
	return document.body.removeChild(t), e;
}

// 兼容ie8

var measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure",document.body.appendChild(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
	
// bootstrap 实例

出现遮罩层去除滚动条闪烁
body 添加 overflow:hidden;  padding-right:_getScrollbarWidth()+"px"
modal 背景层
modal内容曾 也要添加 padding-right:_getScrollbarWidth()+"px"


# 弹出层内容过多让其出现滚动条


	<div class="modal" style="padding-right:17px;display:block">
		<div class="modal-dialog">
			<div class=""></div>
		</div>
	</div>


.modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
	display:none;
	overflow:hidden;
    outline: 0;
}
.modal-open .modal {
    overflow-x: hidden;
    overflow-y: auto;
}
.fade.show {
    opacity: 1;
}
.modal {
    z-index: 1072;
}
.modal.fade .modal-dialog {
    transition: -webkit-transform .3s ease-out;
    transition: transform .3s ease-out;
    transition: transform .3s ease-out,-webkit-transform .3s ease-out;
    -webkit-transform: translate(0,-25%);
    transform: translate(0,-25%);
}
.modal.show .modal-dialog {
    -webkit-transform: translate(0,0);
    transform: translate(0,0);
}


