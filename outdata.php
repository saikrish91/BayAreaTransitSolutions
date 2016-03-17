<?php
extract( $_POST);
$stopID = explode(",",$stopsListNames);
$ch = curl_init("http://services.my511.org/Transit2.0/GetNextDeparturesByStopCode.aspx?token=9002da68-5891-4a91-aaf2-85a3fd1dcf0d&stopcode=".$stopID[0]);
$filename="511files/".$stopID[0]."_timings.xml";
$fp = fopen($filename, "w");
curl_setopt($ch, CURLOPT_FILE, $fp);
//curl_setopt($ch, CURLOPT_HEADER, 0);
curl_exec($ch);
curl_close($ch);
fclose($fp);
?>