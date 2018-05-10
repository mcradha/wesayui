<?php
session_start();
$_SESSION["token"] = $_GET['q'];
header("Location: index.php?q=welcome");
?>