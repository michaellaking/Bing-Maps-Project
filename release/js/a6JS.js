/**
 * Author:  Michael Laking
 * ID:      000775971
 * Date:    December 2018
 * 
 * This is solely my work.
 * 
 * Purpose: This page provides functionality to index.php. Event Listeners are
 *          utilized to begin a new function when a specific button is clicked.
 *          This includes, shuffling through the database from oldest item to
 *          newest item (DESC broke the code in terms of adding new items to the
 *          UI), additionally the user may click the Create Button to randomly
 *          generate 10 new items within the database. Further, AJAX is used to
 *          perform a database check every 2 seconds to determine if new items
 *          have been added to the database. If a new item or items has been added
 *          the innerHTML is updated to showcase the number of new items.
 */


divCount = 0;                                                                   // Current Number of divs in newsfeed
currentLastItem = 0;                                                            // Last item viewable in the newsfeed
resetNewsFeed = false;                                                          // Initialize NewsFeed needs reset to False
numberOfItems = 0;                                                              // Total number of Items viewable on the newsfeed

$(document).ready( function() {
      
    /**
     * The checkFeed Function is used to constantly check for new additions to
     * the Hockey_Games Database Table. If new items have been added, the
     * notification bar at the top will change according to the number of non-
     * viewed items. 
     * @returns {undefined}
     */
    function checkFeed() {
        $.ajax({
            type: "POST",
            url: "Records.php",
            cache: false,
            data: "",
            /**
             * This function retrieves the JSON encoded values from Records.php.
             * The data is then parsed to an array of Hockey Records objects. 
             * The length of the array is compared to the current divCount to confirm
             * if any new items have been added to the Database since last checked.
             * If new items exist, the innerHTML of updates is changed to represent
             * the number of items the user has not viewed yet.
             * @param {type} data
             * @returns {undefined}
             */
            success: function (data) {
                var gameArray = $.parseJSON(data);
                if ( gameArray.length > divCount ) {
                    var newItems = gameArray.length - divCount;
                }
                else if ( gameArray.length == divCount ) {
                        newItems = 0;
                }
                document.getElementById("updates").innerHTML = newItems + " New Scores";
            },
            complete: checkFeed,                                                 
            timeout: 5000
        });
    }    

    setTimeout(checkFeed, 1000);                                                // Callback checkFeed every 1s

    
    
    /**
     * An EventListener is utilized to provide functionality to the viewRecordsButton.
     * This button uses AJAX to access the Hockey_Records Database Table, parse the data
     * and dynamically create new Divs to contain the Records from the database. This function
     * also accomplishes the removal of Divs when the newsfeed is full and removes these
     * Divs from the current HTML. 
     */
    document.getElementById("viewRecordsButton").addEventListener("click", function() {
            $.ajax({
                type: "POST",
                url: 'Records.php',
                data: "",
                /**
                 * Parses the JSON Data to a gameArray. The newsfeed is checked
                 * to see if it needs to be cleared. Then the user is displayed
                 * with new divs of content from the Database they have not viewed
                 * and continues to flip through the content until no items are
                 * left in the Database.
                 * @param {type} data JSON Array of Hockey_Records Data
                 * @returns {undefined}
                 */
                success: function(data){
                    document.getElementById("updateNotify").innerHTML = "";
                    var gameArray = $.parseJSON(data);                              // Parse JSON       

                    if ( resetNewsFeed == true ) {                                  // If newfeed needs reset, remove all current
                        for ( i = 0; i < currentLastItem; i++ ) {                   // newsItem divs
                            if ( document.getElementById("newsItem_" + i ) != null ) {
                                document.getElementById("newsItem_" + i ).remove();
                            }
                        }
                        numberOfItems = 0;                                          // Reset items on newsfeed currently to 0
                        resetNewsFeed = false;                                      // Reset needs cleared to false
                    }

                                                
                    if ( gameArray.length > 0 ) {                                   // Length of Array must be greater than 0
                        for ( i = currentLastItem; i < gameArray.length; i++ ) {    // For each item after the last item viewed creates
                            numberOfItems++;                                        // new divs with content from the Database until 8 items                                                                        
                            if ( numberOfItems >= 9 ) {                             // are showcased
                                resetNewsFeed = true;
                                break;
                            }
                            else {
                            var newsFeedContents = document.getElementById("newsfeed");         // Access newsfeed container
                            var newDiv = document.createElement("div");                         // Create new div
                            newDiv.setAttribute("class", "newsItem");                           // Append class attributes
                            newDiv.setAttribute ("id", "newsItem_" + divCount);                 // Append unique id
                            newsFeedContents.append(newDiv);                                    // Append div to newsfeed container
                            $("#newsItem_" + divCount).append("<p class='team'>" + gameArray[i].Team1 + "</p>" +  "<p class='vs'>vs.</p>" + "<p class='team'>" + gameArray[i].Team2)+ "</p>";
                            $("#newsItem_" + divCount++).append("<br>" + "<p class='score'>" + gameArray[i].Goals_T1 + "</p>" + "<p class='score'>" + gameArray[i].Goals_T2 + "</p>");
                            }
                        }
                    }
                    currentLastItem = divCount;
                }
            }); 
    });
    
    /**
     * This function calls the createRecord.php which randomly generates 10 new
     * Hockey_Record items to be inserted into the database. And notifies the user
     * that the Records have been added successfully.
     */
    document.getElementById("createRecordsButton").addEventListener("click", function() {
        $.ajax({
            type: "POST",
            url: 'createRecord.php',
            data: "",
            success: function (data) {
                document.getElementById("updateNotify").innerHTML = data;
            }
        });
    });
});