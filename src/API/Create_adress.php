<?php

$myjson = file_get_contents('php://input');
$obj = json_decode($myjson,true);

$adresse1 = $obj['adresse1'];
$adresse2 = $obj['adresse2'];
$titre_adresse = $obj['titre_adresse'];
$telephone = $obj['telephone'];
$prenom = $obj['prenom'];
$nom = $obj['nom'];
$id_customer = $obj['id_customer'];
$latitude = $obj['latitude'];
$longitude = $obj['longitude'];
$adresses_key = $obj['adresses_key'];
$_url = $obj['_url'];

/*$adresse1 ="Careffour aziz";
$adresse2 ="17-525";
$titre_adresse ='Maison de MOu';
$telephone ='49434962';
$prenom ='Mou';
$nom ='Mou';
$id_customer=4;
$latitude=4656532542.57545;
$longitude=78956422.258445;
$adresses_key = '694QDEI67Q4U6P1W4QFK7QYVVLMIE7JC';

$_url='http://madis-madimarket.com';*/

$date_now=date('Y-m-d H:i:s');
//echo $id_customer

require_once('./PSWebServiceLibrary.php');
$result = new \stdClass();

try {
    $webService = new PrestaShopWebservice($_url, $adresses_key, false);
    $xml = $webService->get([ 'url' =>$_url.'/api/addresses?schema=blank&ws_key='.$adresses_key ] );
    $Fields =    $xml->address->children();

    $Fields->firstname =$prenom;
    $Fields->lastname =$nom;
    // $Fields->alias= $prenom.' '.$nom;
    $Fields->alias=$titre_adresse;
    $Fields->id_customer =$id_customer;
    $Fields->id_country=142;
    $Fields->city='Nouakchott';
    $Fields->address1=$adresse1;
    $Fields->other=$latitude.' / '.$longitude;


    $Fields->address2=$adresse2;
    $Fields->phone_mobile =$telephone;
    $Fields->date_add= $date_now;
    $Fields->date_upd= $date_now;

    $createdXml = $webService->add([
        'resource' => 'addresses?ws_key='.$adresses_key ,
        'postXml' =>   $xml->asXML(),
      ]);
       $newFields = $createdXml->address->children();
      echo  $newFields->id . PHP_EOL;
    

} 
catch (PrestaShopWebserviceException $ex) {
    // Shows a message related to the error
    $result->msg="error";
   $result->error=$ex->getMessage();
 //  $result->error=$ex;
   // echo 'Other error: <br />' . $ex->getMessage();
    echo json_encode($result);
   
}

?>