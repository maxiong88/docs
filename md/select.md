select 


js获取select标签选中的值

一、JavaScript：  (也可以通过select id 与name值获取)

    1.拿到select对象，document.getElemenetById('id') / document.querySelector / 

    // selectedIndex代表的是你所选中项的index （默认从0开始）
    2.拿到选中的索引，var index = selectObj.selectedIndex

    3.拿到选中项options的value等其他属性，selectObj.options[index].value(或者任何属性)

    4.拿到选中项options的text，selectObj.options[index].text


###### 设置下拉列表中被选选项的文本

    `
    <html>
    <head>
    <script type="text/javascript">
    function changeText()
    {
    var x=document.getElementById("mySelect")
    x.options[x.selectedIndex].text="Melon"
    }
    </script>
    </head>
    <body>

    <form>
    Select your favorite fruit:
    <select id="mySelect">
    <option>Apple</option>
    <option>Orange</option>
    <option>Pineapple</option>
    <option>Banana</option>
    </select>
    <br /><br />
    <input type="button" onclick="changeText()" value="Set text of selected option">
    </form>

    </body>
    </html>
    `

###### 从下拉列表中删除选项

    `
    <html>
    <head>
    <script type="text/javascript">
    function removeOption()
    {
    var x=document.getElementById("mySelect")
    x.remove(x.selectedIndex)
    }
    </script>
    </head>
    <body>

    <form>
    <select id="mySelect">
    <option>苹果</option>
    <option>桃子</option>
    <option>香蕉</option>
    <option>桔子</option>
    </select>
    <input type="button" onclick="removeOption()" value="删除被选的选项">
    </form>

    </body>
    </html>
    `