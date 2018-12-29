css3 div:nth-of-type(n) 规定其父元素的第二个div的元素

		“nth-of-type”选择的是某父元素的子元素，而且这个子元素是指定类型

		`
		nth-of-type(2)
		<div>
			<p>1</p>
			<p>1</p>
			<div>1</div><p>1</p>
			<p>1</p>
			<div>此标签会被点亮</div>
		</div>
		`

css3 div:nth-child(n) 其父元素的第二个子元素的每个div标签		
		
		“nth-child”选择的是父元素的子元素，这个子元素并没有指定确切类型，同时满足两个条件时方能有效果：其一是子元素，其二是子元素刚好处在那个位置；
		
		`
		nth-child(2)
		<div>
			<p>1</p>
			<div>此标签会被点亮</div>
			<div>1</div><p>1</p>
			<p>1</p>
			<div>1</div>
		</div>
		<div>
			<p>1</p>
			<p><div>不会被点亮</div>1</p>
			<div>1</div><p>1</p>
			<p>1</p>
			<div>1</div>
		</div>	
		`