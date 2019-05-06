<?php
/**
 * Author:  Michael Laking
 * ID:      000775971
 * 
 * This is solely my work.
 * 
 */


require 'db.php';
/**
 * If the wineryID is not empty, and is not null, the variable is filtered and saved
 */
if ($_POST['wineryID'] != "" || $_POST['wineryID'] != null) {
    $wineryID = filter_input(INPUT_POST, 'wineryID', FILTER_SANITIZE_STRING);
}
/**
 * Selects all Columns from the Winery_Reviews DB where the ID is equal to
 * the variable provided.
 */
$sql = ("SELECT * FROM Winery_Reviews WHERE Winery_ID = $wineryID");                                        
$result = $conn->prepare($sql);                                                 
$result->execute();                                                             

/**
 * If the result's rowCount is equal to 0, the .html page is notified
 * else, the data from the sql is sent back.
 */
if ( $result->rowCount() == 0 ) {
    echo "0";
}
else {
    while ( $row = $result->fetch(PDO::FETCH_ASSOC)) {
        $output[]=$row;
    }
    echo json_encode($output);    
}
