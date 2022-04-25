<?php

$myjson = file_get_contents('php://input');
$obj = json_decode($myjson,true);

$id_address = $obj['id_address'];
$id_customer = $obj['id_customer'];

$products = $obj['products'];

$carts_key = $obj['carts_key'];
$_url = $obj['_url'];

//  $id_address =5;
// $id_customer = 4;

//  $products =  array(
//    "0"=> array("id_article" => 8,"quant" =>2),
//    "1"=> array("id_article" => 9,"quant" =>3),
// );

// $carts_key = 'THKQL2CZD775JJCLL16JUS3WG8WX1RXS';

// $_url='http://madis-madimarket.com';

$date_now=date('Y-m-d H:i:s');

 //echo "yes" ;
require_once('./PSWebServiceLibrary.php');
$result = new \stdClass();

try {
    $webService = new PrestaShopWebservice($_url, $carts_key, false);
    $xml = $webService->get([ 'url' =>$_url.'/api/carts?schema=blank&ws_key='.$carts_key ] );
    $Fields =    $xml->cart->children();

    $Fields->id_currency =3;
    $Fields->id_lang =1;
    $Fields->id_carrier =4;
    for($i=0; $i< sizeof($products); $i++){
        // echo $products[$i]['id_article']."<br>";
        $Fields->associations->cart_rows->cart_row[$i]->id_product= $products[$i]['id_article'];
        $Fields->associations->cart_rows->cart_row[$i]->quantity= $products[$i]['quant'];
        $Fields->associations->cart_rows->cart_row[$i]->id_address_delivery= $id_address;
        $Fields->associations->cart_rows->cart_row[$i]->id_product_attribute= 0;
    }
   
    $Fields->id_address_delivery = $id_address;
    $Fields->id_address_invoice   = $id_address;
    $Fields->id_customer =$id_customer;
   
    $Fields->date_add= $date_now;
    $Fields->date_upd= $date_now;

    $createdXml = $webService->add([
        'resource' => 'carts?ws_key='.$carts_key ,
        'postXml' =>   $xml->asXML(),
      ]);
       $newFields = $createdXml->cart->children();
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