<?php
include 'DBConfig.php';
 
$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
 
if ($conn->connect_error) {
 
 die("Connection failed: " . $conn->connect_error);
} 
 
//$sql = "SELECT * FROM categorie";
//$sql = "SELECT * FROM article";
 $sql="SELECT article.id_article,article.id_categorie,article.designation,article.description,article.img,article.unit,article.prix,categorie.id_categorie,categorie.designation as categorie
 FROM article article ,categorie categorie
 WHERE article.id_categorie=categorie.id_categorie
 ORDER BY article.designation";


$result = $conn->query($sql);

 
if ($result->num_rows >0) {
 
 while($row[] = $result->fetch_assoc()) {
  //$data['name'] = mb_convert_encoding($data['name'], 'UTF-8', 'UTF-8');
//$tem = $row;
$tem= mb_convert_encoding($row, 'UTF-8', 'UTF-8');
 
$json = json_encode($tem);

 //echo json_last_error_msg(); // Print out the error if any
//die(); // halt the script*/


 }
//  echo "result JSon are. in ";
 //echo $json;
//  echo "result item are.";
  // print_r ($tem);
  
 
} else {
// echo "No Results Found.";
$MSG="No Results Found";
$json=json_encode($MSG);
}
//echo "result json are. out";
 echo $json;
 //echo $json[0].img;
 //echo $json2;
$conn->close();
?>