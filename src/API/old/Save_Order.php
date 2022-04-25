<?php
include 'DBConfig.php';
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 $json = file_get_contents('php://input');
 
 $obj = json_decode($json,true);
 
 $date = $obj['date'];
 $montant = $obj['montant'];
 $id_utilisateur = $obj['id_utilisateur'];
 $longitude = $obj['longitude'];
 $latitude = $obj['latitude'];
 $adresse = $obj['adresse'];
 $telephone = $obj['telephone'];
 $commentaire = $obj['commentaire'];


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

 
 $sql="INSERT into commande (_date,montant,id_utilisateur,longitude,latitude,adresse,telephone,commentaire)
  values ('$date','$montant','$id_utilisateur','$longitude','$latitude','$adresse','$telephone','$commentaire')";
 
 
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
$id_commande=mysqli_insert_id($con);

//$json = json_encode($id_commande);
 
echo $id_commande;
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