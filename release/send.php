<?php

require 'db.php';

/**
 * Author:  Michael Laking
 * ID:      000775971
 * 
 * This is solely my work.
 * 
 */

$wineryID = "";
$userRating = "";
$userName = "";
$userEmail = "";
$userReview = "";

/**
 * if wineryID is not empty, and not null, it is filtered and saved.
 */
if ($_POST['wineryID'] != "" || $_POST['wineryID'] != null) {
    $wineryID = filter_input(INPUT_POST, 'wineryID', FILTER_SANITIZE_STRING);
}
console.log($wineryID);
/**
 * if the userRating is not empty, and not null, it is filtered and saved.
 */
if ($_POST['userRating'] != "" || $_POST['userRating'] != null) {
    $userRating = filter_input(INPUT_POST, 'userRating', FILTER_SANITIZE_STRING);
}
/**
 * if userName is not empty, and not null, it is filtered and saved.
 */
if ($_POST['userName'] != "" || $_POST['userName'] != null) {
    $userName = filter_input(INPUT_POST, 'userName', FILTER_SANITIZE_STRING);
}
/**
 * if the userEmail is not empty, and not null, it is filtered and saved.
 */
if ($_POST['userEmail'] != "" || $_POST['userEmail'] != null) {
    $userEmail = filter_input(INPUT_POST, 'userEmail', FILTER_SANITIZE_STRING);
}
/**
 * if the userReview is not empty, and not null it is filtered and saved.
 */
if ($_POST['userReview'] != "" || $_POST['userReview'] != null) {
    $userReview = filter_input(INPUT_POST, 'userReview', FILTER_SANITIZE_STRING);
}

/**
 * INSERTS into Winery_Reviews all variables previously saved.
 */
$sql = "INSERT INTO Winery_Reviews ( winery_ID, userName, userEmail, userRating, userReview )"              // Insert SQL
        . "Values (?, ?, ?, ?, ?)";

$result = $conn->prepare($sql);
$result->execute([$wineryID, $userName, $userEmail, $userRating, $userReview]);                             // Insert into Database    
if ($result) {
    echo 1;
}