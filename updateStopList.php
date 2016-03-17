<?php
	extract( $_POST);
	$stopID = explode(",",$stopsListNames);
	//http://services.my511.org/Transit2.0/GetRoutesForAgency.aspx?token=9002da68-5891-4a91-aaf2-85a3fd1dcf0d&agencyName=Caltrain
	//http://services.my511.org/Transit2.0/GetStopsForRoute.aspx?token=9002da68-5891-4a91-aaf2-85a3fd1dcf0d&routeIDF=AgencyName~RouteCode~RouteDirectionCode
	$routes=["AC Transit","Dumbarton Express","Marin Transit","SamTrans","SF-MUNI","Vine (Napa County)","VTA","WESTCAT"];
	for($i=0;$i<8;i++){
	   $ch = curl_init("http://services.my511.org/Transit2.0/GetRoutesForAgency.aspx?token=9002da68-5891-4a91-aaf2-85a3fd1dcf0d&agencyName=".$routes[$i]);511files
	  $filename=$stopID[0]."_timings.xml";
	  $fp = fopen($filename, "w");
	  curl_setopt($ch, CURLOPT_FILE, $fp);
	  //curl_setopt($ch, CURLOPT_HEADER, 0);
	  curl_exec($ch);
	  curl_close($ch);
	  fclose($fp);
		
	}
	$ch = curl_init("http://services.my511.org/Transit2.0/GetNextDeparturesByStopCode.aspx?token=9002da68-5891-4a91-aaf2-85a3fd1dcf0d&stopcode=".$stopID[0]);
	$filename=$stopID[0]."_timings.xml";
	$fp = fopen($filename, "w");
	curl_setopt($ch, CURLOPT_FILE, $fp);
	//curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_exec($ch);
	curl_close($ch);
	fclose($fp);
?>