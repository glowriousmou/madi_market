<?php
$myjson = file_get_contents('php://input');
$obj = json_decode($myjson,true);

$prenom = $obj['prenom'];
$nom = $obj['nom'];
$email = $obj['email'];
$psw = $obj['psw'];

/*$prenom ="bb";
$nom ="cc";
$email = "b@c.com";
$psw = "123456";*/

$result = new \stdClass();
try {
    require_once('./vendor/autoload.php');


    // creating webservice access
   // $webService = new PrestaShopWebservice('http://example.com/', 'ZR92FNY5UFRERNI3O9Z5QDHWKTP3YIIT', false);
   $url_='http://madis-madimarket.com/';
   $customer_key='A69UADXWJIZWWUJW52C7ZHLNDG79A6MJ';
  
$authorizationKey = base64_encode($customer_key . ':'); // VUNDTExROU4yQVJTSFdDWExUNzRLVUtTU0szNEJGS1g6
  //  $webService = new PrestaShopWebservice( $url_,$authorizationKey  , false);
    $webService = new PrestaShopWebservice( $url_,$customer_key  , false);
 
    // call to retrieve the blank schema
    $blankXml = $webService->get(['url' => 'http://madis-madimarket.com/api/customers?schema=blank&ws_key=A69UADXWJIZWWUJW52C7ZHLNDG79A6MJ']);
 //  $xml = $webService->get(['resource' => 'customers?ws_key=A69UADXWJIZWWUJW52C7ZHLNDG79A6MJ']);
   /* $customerFields = $blankXml->customer->children();
    $customerFields->firstname = 'Clark';
    $customerFields->lastname = 'Clark';
    $customerFields->email = 'c.c@unknown.com';
    $customerFields->passwd = 'password1234';*/
    $customerFields = $blankXml->customer->children();
    $customerFields->firstname = $prenom;
    $customerFields->lastname = $nom;
    $customerFields->email = $email;
    $customerFields->passwd = $psw;
    $customerFields->active = true;
    $customerFields->id_default_group = 3;
    $customerFields->associations->groups->group->id = 3;
   

    $createdXml = $webService->add([
    'resource' => 'customers?ws_key=A69UADXWJIZWWUJW52C7ZHLNDG79A6MJ',
    'postXml' => $blankXml->asXML(),
    ]);
    $newCustomerFields = $createdXml->customer->children();
    //echo 'Customer created with ID ' . $newCustomerFields->id . PHP_EOL;
    $result->msg="ok";
    $result->id=$newCustomerFields->id ;
   // echo json_encode($result);
    echo $newCustomerFields->id . PHP_EOL;
} 
catch (PrestaShopWebserviceException $ex) {
    // Shows a message related to the error
    $result->msg="error";
    $result->error=$ex->getMessage();
   // echo 'Other error: <br />' . $ex->getMessage();
    echo json_encode($result);
}
?>