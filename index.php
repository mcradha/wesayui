<?php
session_start();
if(!isset($_SESSION['token'])) {
	include_once("themes/pages/login.html");
}
else 
{
	$sessionid = $_SESSION['token'];
	switch($_GET['q']){
		case "welcome":
		include_once("themes/pages/index.html");
		break;
		case "logout":
		 session_destroy();
		 header("Location: index.php");
		break;
		
	}
}	
?>
 
