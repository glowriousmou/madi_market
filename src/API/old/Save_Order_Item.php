<?php
include 'DBConfig.php';
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 $json = file_get_contents('php://input');
 
 $obj = json_decode($json,true);
 
 $id_commande = $obj['id_commande'];
 $id_article = $obj['id_article'];
 $quant = $obj['quant'];
 $prix = $obj['prix'];
 
//  $id_commande = "20";
//  $id_article = "1";
//  $quant ="10";
//  $prix = "100";
 


//  $date ="2015/02/15";
//  $montant = "1002";
//  $id_utilisateur = "12";
//  $longitude = "1.5787385632";
//  $latitude ="2.45768682";
//  $adresse ="my adress2";
//  $telephone ="477562";
//  $commentaire ="my comment2";

//  $telephone = "55632552";
//  $nom ="TestAAAAAAA";
 
//  if (mysqli_connect_errno())
//  {
//      echo "Failed to connect:" . mysqli_connect_error();
//      }
//      else{
//          echo "connect successfully";
//      }

 
 $sql="INSERT into panier (id_commande,id_article,quant,prix)
  values ('$id_commande','$id_article','$quant','$prix')";
 
 
 //$sqlin = mysql_prep($sql);
//  if (!mysqli_query($con, $sql)){
//      die ('Error: ' . mysqli_error($con));
//      }
//      else{
//         echo "mysqli_query successfully";
//      }
 if(mysqli_query($con,$sql)){
 
$MSG =  mb_convert_encoding('Success' , 'UTF-8', 'UTF-8');
$json = json_encode($MSG);
//$id_commande=mysqli_insert_id($con);

//$json = json_encode($id_commande);
 
echo "Success";
 //echo $json ;
 //echo json_last_error_msg();
 
 }
 else{
 $json = json_encode("Error");
// $json = json_encode(. mysqli_error($con));
 echo $json ;
 //echo json_last_error_msg();
 die ('Error: ' . mysqli_error($con));
 }
 mysqli_close($con);
?>