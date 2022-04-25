<?php
include 'DBConfig.php';
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 $json = file_get_contents('php://input');
 
 $obj = json_decode($json,true);
 
 $telephone = $obj['telephone'];
 $nom = $obj['nom'];

//  $telephone = "5563250000";
//  $nom ="TestAAAAAAA";
 


 $sql="INSERT into utilisateur (telephone,nom) values ('$telephone','$nom')";
 
 
 if(mysqli_query($con,$sql)){
 
$MSG = 'Success' ;

$json = json_encode($MSG);
 

 echo $json ;
 
 }
 else{
 
 echo 'Try Again';
 
 }
 mysqli_close($con);
?>