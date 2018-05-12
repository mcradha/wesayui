<?php
session_start();
if(!isset($_SESSION['token'])) {
	include_once("themes/pages/login.html");
}
elseif(! isset($_GET['q']))
{
	header("Location: index.php?q=welcome");
}
else
{
	$sessionid = $_SESSION['token'];
	switch($_GET['q']){
		case "welcome":
			include_once("themes/templates/header.php");
			include_once("themes/pages/index.html");
		break;
		case "settings":
			include_once("themes/templates/header.php");
			include_once("themes/pages/forms.html");
		break;
		case "contacts":
			include_once("themes/templates/header.php");
			include_once("themes/pages/contacts.html");
		break;
		case "friends":
			include_once("themes/templates/header.php");
			include_once("themes/pages/friends.html");
		break;
		
		case "logout":
		 session_destroy();
		 header("Location: index.php");
		break;
		
	}
}	
?>
 
