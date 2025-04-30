<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header("content-type: application/json");
$servername = "faure";
$username = "c837317580";
$db = "c837317580";
$password = "837317580";
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
	http_response_code(400);
  die("Connection failed: " . $conn->connect_error);
}
if ($_SERVER["REQUEST_METHOD"] === "GET"){
	if(isset($_GET["colors_count"])){
		getColors($conn);
	}
	else {
		handleGet($conn);
	}
}
elseif ($_SERVER["REQUEST_METHOD"] === "POST"){
	handlePost($conn);
}

function getColors($conn) {
	$sql = "SELECT * FROM colors order by name";
	$result = $conn->query($sql);
	$output = array();
	while($row = $result->fetch_assoc())
		array_push($output, $row);
	http_response_code(200);
	echo json_encode($output);
}
function handleGet($conn) {
	$count = isset($_GET["count"]) ? $_GET["count"] : "5";
	$sql = "SELECT name, hexvalue FROM colors ORDER BY name LIMIT $count";
	$result = $conn->query($sql);
	
	$output = array();
	while($row = $result->fetch_assoc())
		array_push($output, $row);
	http_response_code(200);
	echo json_encode($output);
}
function handlePost($conn) {
	$json = json_decode(file_get_contents('php://input'));
	$name = $json->name;
	$hexvalue = $json->hexvalue;
	$sql = "INSERT into colors(name, hexvalue) values ('$name', '$hexvalue')";
	$result = $conn->query($sql);
	if($result) {
		http_response_code(201);
	}
	else {
		http_response_code(418);
	}
}
?>
