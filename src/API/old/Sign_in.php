<?php
include 'DBConfig.php';
 
$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
 
if ($conn->connect_error) {
 
 die("Connection failed: " . $conn->connect_error);
} 
$myjson = file_get_contents('php://input');
$obj = json_decode($myjson,true);
 $telephone = $obj['telephone'];
 //$psw = $obj['psw'];
 //$telephone = "147896";
 //$psw ="123";
 
 $sql="SELECT nom,telephone,psw,id_utilisateur
 FROM utilisateur
 WHERE telephone='$telephone' ";


$result = $conn->query($sql);

 
if ($result->num_rows >0) {
 
 while($row[] = $result->fetch_assoc()) {
 $tem = $row;
 
$json = json_encode($tem);

 //echo json_last_error_msg(); // Print out the error if any
//die(); // halt the script*/


 }
//  echo "result JSon are. in ";
// echo $json;
//  echo "result item are.";
  // print_r ($tem);
  
 
} else {
    $MSG="No Results Found";
    $json=json_encode($MSG);
 //echo "No Results Found.";
 
 //echo $json ;
}
//echo "result json are. out";
 echo $json;
 //echo $json[0].img;
 //echo $json2;
$conn->close();
?>