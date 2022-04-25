<?php

$myjson = file_get_contents('php://input');
$obj = json_decode($myjson,true);

$prenom = $obj['prenom'];
$nom = $obj['nom'];
$email = $obj['email'];
$psw = $obj['psw'];
$customer_key = $obj['customers_key'];
$_url = $obj['_url'];

/*$prenom ='bb';
$nom ='cc';
$email = 'bbbb2@cc.com';
$psw = '123456';

$_url='http://madis-madimarket.com';
$customer_key='L624PZP1SN7KN5B5K59EL4VQ4TFGED93';*/

$date_now=date('Y-m-d H:i:s');


require_once('./PSWebServiceLibrary.php');
$result = new \stdClass();
/*echo  $prenom.'<br/>';
echo  $nom.'<br/>';
echo  $email.'<br/>';
echo  $psw.'<br/>';
echo  $customers_key.'<br/>';
echo  $_url.'<br/>';*/
try {
  $webService = new PrestaShopWebservice($_url, $customer_key, false);
   
       
              $xml = $webService->get([ 'url' =>$_url.'/api/customers?schema=blank&ws_key='.$customer_key ] );

             $customerFields =    $xml->customer->children();
          //   echo    $xml ;

             $customerFields->firstname =$prenom;
                $customerFields->lastname = $nom;
                $customerFields->email = $email;
                $customerFields->passwd = $psw;

               

               $customerFields->active =true;
                $customerFields->id_default_group = 3;
                $customerFields->associations->groups->group->id = 3;

                $customerFields->last_passwd_gen     = $date_now;
                $customerFields->date_add            = $date_now;
                $customerFields->date_upd            = $date_now;
                $customerFields->id_gender           = 0;
             

               $createdXml = $webService->add([
                  'resource' => 'customers?ws_key='.$customer_key ,
                  'postXml' =>   $xml->asXML(),
                ]);
                 $newCustomerFields = $createdXml->customer->children();
                echo  $newCustomerFields->id . PHP_EOL;
               

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