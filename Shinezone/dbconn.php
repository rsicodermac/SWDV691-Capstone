<?php
    // Database configuration
    $host = "localhost"; 
    $dbUserName = "recspor2_scores";
    $dbPwd = "#Sh!neZ0ne"; 
    $dbName = "recspor2_leaderboard"; 
    $table = "top_scores"; 
    //$table2 = "shinezone_users"; 
	
    // Start connection to database server
    $conn = mysqli_connect($host, $dbUserName, $dbPwd);
    if (!$conn) {
        die('Could not connect: ' . mysqli_connect_error());
    }

    // make connection to database
	$db_selected = mysqli_select_db($conn, $dbName);
    if (!$db_selected) {
        die ('Can\'t use database'.$dbName.' : ' . mysqli_connect_error());
    }	
	//mysql_close($link);
?>