<?php
$data = json_decode(file_get_contents("php://input"));
include "db.php";
$sql = "INSERT INTO chat_database (username, sender, chat_date, rx_chat,tx_chat)
VALUES ('$data->username', '$data->sender', '$data->chat_date', '$data->rx_chat', '$data->tx_chat')";
if($data->name){
	$qry = $conn->query($sql);
}
$conn->close();
?>

