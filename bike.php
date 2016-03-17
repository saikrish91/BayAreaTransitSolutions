<?php
$ch = curl_init("http://www.bayareabikeshare.com/stations/json");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$jsonvalue=curl_exec($ch);
curl_close($ch);
echo $jsonvalue;
?>