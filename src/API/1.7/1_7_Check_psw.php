<?php
$myjson = file_get_contents('php://input');
$obj = json_decode($myjson,true);
$psw_input = $obj['psw_input'];
$my_psw_ps = $obj['my_psw_ps'];

 //$psw_input = '00lm123';
// $my_psw_ps = '$2y$10$9YfsvsPNoziTTJ31PZ03EuQf8pdEn9Urei0egV8Fuza.qbg6uqlLK';
 //$my_psw_ps = '$2y$10$uZwMbxHoxPSIYM5LFvLxbe3IAdhF4AFozUwcFBOIuVhWpp8nveSgS';

//$local_hash= password_hash($psw_input , PASSWORD_BCRYPT);
 //$verify = password_verify($psw_input, $my_psw_ps);
 //echo  $verify;
 //$my_psw_ps = '$2y$07$BCryptRequires22Chrcte/VlQH0piJtjXl.0t1XkA8pw9dMXTpOq';
 //$psw_input='rasmuslerdorf';
 if (password_verify($psw_input, $my_psw_ps )) {
// if (password_verify($psw_input, $local_hash )) {
 //   echo 'Password is valid! ';
    $msg=json_encode("ok");

  //  echo $local_hash;
   // echo  $my_psw_ps;
} else {
   // echo 'Invalid password.';
    $msg=json_encode("failed");
}
echo $msg;

?>