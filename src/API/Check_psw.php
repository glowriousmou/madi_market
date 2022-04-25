<?php
$myjson = file_get_contents('php://input');
$obj = json_decode($myjson,true);
$psw_input = $obj['psw_input'];
$my_psw_ps = $obj['my_psw_ps'];

/*$psw_input ='123457';
$my_psw_ps = '6017bf5e61ecb937f7d69c4efea51297';*/
// config/settings.inc.php
$_COOKIE_KEY_= 'QAyRTw32E953utRXEKtozFpBI6wOBM7tGEWd9DpVx2YfgIUWQXBznG9M';


//$salt = substr($my_psw_ps , strrpos($my_psw_ps ,':')+1, 2);
//$ZCpassword = md5($salt .$psw_input ) . ':' . $salt;
//$ZCpassword = md5($salt .$psw_input ) ;
//$encrypt =md5('QAyRTw32E953utRXEKtozFpBI6wOBM7tGEWd9DpVx2YfgIUWQXBznG9M'.'123456');
$encrypt =md5($_COOKIE_KEY_.$psw_input );

//echo  $encrypt ."input <br>";
//echo  $my_psw_ps  ."real <br>";
if ($encrypt == $my_psw_ps ){
$msg=json_encode("ok");


} else {

  $msg=json_encode("failed");
}
echo $msg;
?>