<?php
//questions?  Ask Dan Paschal daniel.paschal@learningfuze.com
$proxyURL = "https://www.superheroapi.com/api.php";
//$proxyURL = "https://api.fortnitetracker.com/v1/profile/{$_GET['platform']}/{$_GET['player']}";
$acceptableHeaders = [];

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: " . implode(',', $acceptableHeaders));
$params = '';

$apiKey = array_key_exists('apikey', $_GET) ? $_GET['apikey'] : '';
$id = array_key_exists('id', $_GET) ? intval($_GET['id']) : '';
$proxyURL .= "/$apiKey/$id/";

$headers = apache_request_headers();

$curl = curl_init();
$headerParams = [];
foreach ($headers as $key => $value) {
  if (in_array($key, $acceptableHeaders)) {
    $headerParams[] = "$key:$value";
  }
}
curl_setopt_array($curl, array(
  CURLOPT_URL => "$proxyURL?$params",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_SSL_VERIFYHOST => 0,
  CURLOPT_SSL_VERIFYPEER => 0,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => $headerParams
));
$response = curl_exec($curl);
$err = curl_error($curl);
echo $err;
echo $response;
?>
