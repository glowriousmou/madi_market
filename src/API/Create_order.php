<?php

$myjson = file_get_contents('php://input');
$obj = json_decode($myjson,true);

$id_address = $obj['id_address'];
$id_customer = $obj['id_customer'];
$id_cart = $obj['id_cart'];
$total_paid = $obj['total_paid'];
$total_shipping = $obj['total_shipping'];

$products = $obj['products'];



$orders_key = $obj['orders_key'];
$_url = $obj['_url'];

//  $id_address =12;
// $id_customer = 14;
// $id_cart=48;
// $total_paid=70;

//  $products =  array(
//    //"0"=> array("id_article" => 8,"quant" =>2,"designation"=>"Bissap","reference"=>"","prix_u"=>50),
//    "0"=> array("id_article" => 9,"quant" =>3,"designation"=>"poudre de pain de singe(bouye)","reference"=>"","prix_u"=>70)
// );

// $orders_key = 'WAU242MTD731T42FJGUAHL6122MVFF2N';

// $_url='http://madis-madimarket.com';

$date_now=date('Y-m-d H:i:s');

//  echo "item" . sizeof($products). '<br />' ;
//   echo "id_address".$id_address. '<br />' ;
//   echo "id_cart".$id_cart. '<br />' ;
//   echo "total_paid".$total_paid. '<br />' ;
//   echo "id_customer".$id_customer. '<br />' ;
//   echo "orders_key".$orders_key. '<br />' ;
//   echo "_url".$_url. '<br />' ;
require_once('./PSWebServiceLibrary.php');
$result = new \stdClass();

try {
    $webService = new PrestaShopWebservice($_url, $orders_key, false);
    $xml = $webService->get([ 'url' =>$_url.'/api/orders?schema=blank&ws_key='.$orders_key ] );
    $Fields =    $xml->order->children();

     $Fields->id_cart =$id_cart;
    $Fields->id_currency =3;
    $Fields->id_lang =1;
    $Fields->id_carrier=4;
    $Fields->module="cashondelivery";
    $Fields->payment ="Cash on delivery (COD)";
    $Fields->total_paid =$total_paid;
    $Fields->total_shipping =$total_shipping;

    $Fields->total_paid_real =$total_paid;
    $Fields->total_products =$total_paid;
    $Fields->total_products_wt =$total_paid;
    $Fields->conversion_rate=1;

    $Fields->valid=1;
    //$Fields->current_state=3;

   
    $Fields->id_address_delivery = $id_address;
    $Fields->id_address_invoice   = $id_address;
    $Fields->id_customer =$id_customer;
   
    $Fields->date_add= $date_now;
    $Fields->date_upd= $date_now;

    for($i=0; $i< sizeof($products); $i++){
        // echo $products[$i]['id_article']."<br>";
        // $Fields->associations->order_rows->order_row[$i]->id = $i;
        $Fields->associations->order_rows->order_row[$i]->product_id = $products[$i]['id_article'];
        $Fields->associations->order_rows->order_row[$i]->product_attribute_id = 0;
        $Fields->associations->order_rows->order_row[$i]->product_quantity=  $products[$i]['quant'];
        $Fields->associations->order_rows->order_row[$i]->product_name =$products[$i]['designation'];
        $Fields->associations->order_rows->order_row[$i]->product_reference = $products[$i]['reference'];
        $Fields->associations->order_rows->order_row[$i]->product_price =$products[$i]['prix_u'];
        $Fields->associations->order_rows->order_row[$i]->unit_price_tax_incl =$products[$i]['prix_u'];
        $Fields->associations->order_rows->order_row[$i]->unit_price_tax_excl=$products[$i]['prix_u'];
    }

    $createdXml = $webService->add([
        'resource' => 'orders?ws_key='.$orders_key ,
        'postXml' =>   $xml->asXML(),
      ]);
       $newFields = $createdXml->order->children();
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