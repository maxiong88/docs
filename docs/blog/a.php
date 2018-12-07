<?php

// header('Access-Control-Allow-Credentials: true');

// header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Origin:'.$_SERVER["HTTP_ORIGIN"].'');
//header('Access-Control-Allow-Headers: Content-Type,Access-Token');
//header('Access-Control-Fxpose-Headers: *');
//header('Access-Control-Allow-Origin: *');
/*
	如果设置了 withCredentials:属性是一个boolean值，
	该指示了是否该使用类似cookie authorization headers 或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制
	（cross-site Access-Control）请求。在同一站点下使用withCredentials属性是无效的。
	
	
	如果widthCredentials设置成true以后，它会尝试发送证书或cookie以及请求，
	这意味着另一个源可能尝试进行已认证的请求，
	所以通配符（*）不被允许为Access-control-Allow-origin头
	您必须明确地回答在“Access-Control-Allow-Origin”标题中提出请求的原点才能使其工作
	
	您可以将withCredentials设置为false或实施起源白名单，并在涉及证书时使用有效来源回应CORS请求
	

header('Access-Control-Allow-Origin:'.$_SERVER["HTTP_ORIGIN"].'');
//header('Access-Control-Allow-Origin:http://192.168.83.186:3000');
$value = "my cookie value";

// 发送一个简单的 cookie
setcookie("TestCookie",$value);
*/
//vheader("content-type:application/json");
/*
$value = "my cookie value";

// 发送一个简单的 cookie
setcookie("TestCookie",$value);
if($_REQUEST['name'] === '1'){
	time_sleep_until(time()+1);
	
$json = '{
	"a":1
	}'; 
echo json_decode(json_encode($json)); 

}else if($_REQUEST['name'] === '2'){
$json = '{
	"a":2
	"co":'.$_COOKIE["TestCookie"].'
	}'; 
echo json_decode(json_encode($json));	
	
}else if($_REQUEST['name'] === '3'){
$json = '{
	"a":3
	}'; 
echo json_decode(json_encode($json));	
	
}else if($_REQUEST['name'] === '4'){
$json = '{
	"a":4
	}'; 
echo json_decode(json_encode($json));	
	
}
//echo json_encode($_REQUEST);
*/
echo '111';
?>