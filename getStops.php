<?php
extract( $_POST);
//echo $mode;
//echo $a[2];
//echo "a|b|c|d|e|f|g";
$servername = "localhost";
$username = "saikris1_new";
$password = "password123";
$dbname = "saikris1_wordpress1ce";
$conn = new mysqli($servername, $username, $password, $dbname);
$mode= strtolower($mode);
$sql = "SELECT * FROM ".$mode;
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$result = $conn->query($sql);

//echo "Number of rows retrieved : ".$result->num_rows;

if ($result->num_rows > 0) {
while($row = $result->fetch_assoc()) {
echo $row["Stop_ID"].", ".$row["Stop_Name"]."|";
    }
}
$conn->close();
?>