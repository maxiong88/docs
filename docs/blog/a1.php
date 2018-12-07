<?php


$value = "my cookie value";

// 发送一个简单的 cookie
setcookie("TestCookie",$value);
$arr = array ('a'=>1,'b'=>2,'c'=>3,'d'=>4,'e'=>5);

echo json_encode($_REQUEST);

?>