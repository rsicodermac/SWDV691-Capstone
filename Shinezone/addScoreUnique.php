<?php
include 'dbconn.php';

$data = array("name","email","type","score");
$data_length = count($data);
$data_val = array();
$dataIsset = 0;

for($i = 0; $i < $data_length; $i++){
	if(isset($_REQUEST[$data[$i]])){
		$dataIsset++;
	}
}

if($dataIsset == $data_length){
	for($i = 0; $i < $data_length; $i++){
		$data_val[$i] = isset($_REQUEST[$data[$i]]) == 1 ? $_REQUEST[$data[$i]] : '';
	}
	
	$result = mysqli_query($conn, "SELECT * FROM $table WHERE email='$data_val[1]' AND type='$data_val[2]'");
	
	if($result){
		if (mysqli_num_rows($result) != 0)
		{
			//existing user
			$oldScore = 0;
			for($i = 0; $i < mysqli_num_rows($result); $i++)
			{
				 $row = mysqli_fetch_assoc($result);
				 if($oldScore < $row['score']){
					 $oldScore = $row['score'];
				 }
			}
			
			if($oldScore < $data_val[3]){
				$result = mysqli_query($conn, "UPDATE $table SET score='$data_val[3]' WHERE email='$data_val[1]' AND type='$data_val[2]'");
			}
		}else{
			//new user
			$table_col = '';
			$table_val = '';
			
			for($i = 0; $i < $data_length; $i++){
				$comma = ',';
				if($i == ($data_length-1)){
					$comma = '';	
				}
				$table_col .= $data[$i].$comma;
				$table_val .= "'".$data_val[$i]."'".$comma;
			}
			$result = mysqli_query($conn, "INSERT INTO ".$table." (".$table_col.") VALUES (".$table_val.")");
		}
		echo '{"status":true}';
	}else{
		echo '{"status":false, "error":0}';	
	}
}else{
	echo '{"status":false}';	
}

// Close connection
mysqli_close($conn);
?>