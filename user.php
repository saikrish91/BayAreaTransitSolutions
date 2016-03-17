<?php
error_reporting(E_ALL ^ E_NOTICE);
extract( $_POST );

$servername = "localhost";
$username = "saikris1_bayarea";
$password = "bayAREA123!";
$db="saikris1_bayarea";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$vta = $_POST['vta'];
$bart = $_POST['bart'];
$ac = $_POST['ac'];
$cal = $_POST['cal'];
$dumb = $_POST['dumb'];
$marin = $_POST['marin'];
$sams = $_POST['sams'];
$sf = $_POST['sf'];
$vine = $_POST['vine'];
$west = $_POST['west'];

mysqli_query($conn,"INSERT INTO userdata (vta,bart,ac,cal,dumb,marin,sams,sf,vine,west)
VALUES('$vta', '$bart', '$ac', '$cal','$dumb','$marin','$sams','$sf','$vine','$west')");

if($vta==1||$bart==1||$ac==1||$cal==1||$dumb==1||$marin==1||$sams==1||$sf==1||$vine==1||$west==1)
{
	$sql="SELECT sum(vta),sum(bart),sum(ac),sum(cal),sum(dumb),sum(marin),sum(sams),sum(sf),sum(vine),sum(west) FROM userdata";
}
$result = $conn->query($sql);

while($row = $result->fetch_assoc()) {
		$a=$row["sum(vta)"];
		$b=$row["sum(bart)"];
		$c=$row["sum(ac)"];
		$d=$row["sum(cal)"];
		$e=$row["sum(dumb)"];
		$f=$row["sum(marin)"];
		$g=$row["sum(sams)"];
		$h=$row["sum(sf)"];
		$i=$row["sum(vine)"];
		$j=$row["sum(west)"];
		
    }
$conn->close();		

echo "$a,$b,$c,$d,$e,$f,$g,$h,$i,$j"
?>