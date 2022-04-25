<?php
include 'DBConfig.php';
 
$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
 
if ($conn->connect_error) {
 
 die("Connection failed: " . $conn->connect_error);
} 
 
//$sql = "SELECT * FROM categorie";
$sql = "SELECT * FROM categorie";
 


$result = $conn->query($sql);

 
if ($result->num_rows >0) {
 
 while($row[] = $result->fetch_assoc()) {
 $tem = $row;
 
$json = json_encode($tem);

 //echo json_last_error_msg(); // Print out the error if any
//die(); // halt the script*/
//$image ="C:\wamp64\www\madi_market\img\lfruit.png";
// $image ="http://192.168.1.46/madi_market\/img\/legume.png";
//   echo $image;
// $imageData = base64_encode(file_get_contents($image));
// echo '<img src="data:image/png;base64,'.$imageData.'">';

 }
//  echo "result JSon are. in ";
// echo $json;
//  echo "result item are.";
  // print_r ($tem);
  
 
} else {
 //echo "No Results Found.";
 $MSG="No Results Found";
 $json=json_encode($MSG);
}
//echo "result json are. out";
 echo $json;
 //echo $json[0].img;
 //echo $json2;
$conn->close();
?>