<?php
include 'DBConfig.php';
 
$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
 
if ($conn->connect_error) {
 
 die("Connection failed: " . $conn->connect_error);
} 
$myjson = file_get_contents('php://input');
$obj = json_decode($myjson,true);
 $id_categorie = $obj['id_categorie'];
 //$id_categorie = 1;
//$sql = "SELECT * FROM categorie";
//$sql = "SELECT * FROM article";
 $sql="SELECT article.id_article,article.id_categorie,article.designation,article.description,article.img,article.unit,article.prix,categorie.id_categorie,categorie.designation as categorie
 FROM article article ,categorie categorie
 WHERE article.id_categorie=$id_categorie AND article.id_categorie=categorie.id_categorie
 ORDER BY article.designation";


$result = $conn->query($sql);

 
if ($result->num_rows >0) {
 
 while($row[] = $result->fetch_assoc()) {
 //$tem = $row;
 $tem= mb_convert_encoding($row, 'UTF-8', 'UTF-8');
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