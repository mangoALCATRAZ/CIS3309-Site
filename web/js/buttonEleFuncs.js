/* 
 buttonEleFuncs.js

Represents the js functions for the Fake Internet Points "like" button. This button can be pressed over
and over again to dish out hundreds of likes, before being greyed out permanantly for the user. 

Params:

    butIn: The button js object to be passed in. This should be done for each like button in question
    postIdIn: A numerical representation of the database postId for the post in question that this likc button is associated with
    i: A numerical representation of the current post increment from whatever algorithm is displaying the data. Used to constructing and referencing HTML ids
Funcs:
    butIn.greyOut: What is executed when the button is greyed out, either by the timer or otherwise. This sets
        butIn's greyedOut attribute to true, and does an ajax call to a .jsp that updates the like count of the post in question within the database.
        Note: Within butIn is a .jsp script link. This must be replicated or replaced in a local build.
    
 */

function buttonEleFuncs(butIn, postIdIn, i, gray, userIdString){
    butIn.i = i; //stores current page increment so that naming identifiers becomes easier
    butIn.userPostId = postIdIn; //the database id for the post associated with this like button
    butIn.pressedOnce = false; // a flag determining if this button was pressed once. If it wasn't, this will be set to true, and a 3 second timer will start.
    butIn.greyedOut = false; // a flag determining if this button is greyed out. An implementation of this should set this to be true by default if the user has already liked the post. If this is true, the like button has no functionality and is greyed out.
    butIn.num = 0; // the number of additional likes this button has accrued for this post. This is added to the total both on screen and in-database
    
    if(gray === true){ // grayed out by default if this parameter flag is true
        butIn.greyedOut = true;
        butIn.pressedOnce = true;
        var imgId = "img" + butIn.i;
        var imgEle = document.getElementById(imgId);
        imgEle.src = "icons/up_grey.png";
    }
    
    function greyOut(obj){ // What to do when its time to grey out the button
        if(obj.greyedOut === false){ // if it isn't greyed out already
            obj.greyedOut = true; // set to be greyed out
            var upImgId = "img" + obj.i; //update the local image id string
            var upImgEle = document.getElementById(upImgId); 
            upImgEle.src = "icons/up_grey.png"; // to the greyed out image
            
            var params = {}; // begin constructing params for ajax call to server, this updates the like count on the database for the post in questins
            params.url = "webAPIs/updateLikeCountApi.jsp"; // this can be replaced with whatever script executes this
            params.query = "?postId=" + obj.userPostId + "&updateNum=" + obj.num; // send over the id of the post whos likeNumber should be updated, and the new number to be added to the total.
            params.failFn = function(){
                alert("Error buttonEleFuncs.js line 45");
            };
            ajax(params); // this is designed to be used with the specialized AJAX function that I wrote. See ajax.js for more details.
            
            if(userIdString !== null){
                var paramsInsertMasterList = {};
            
                // the following ensures that the button remains grayed out for the logged in user 
                //replace the next two parameters with whatever works for your database setup
            
                params.url = "webAPIs/insertMasterList.jsp"; // update master list. 
                params.query = "?jsonData=" + '[userLikePostId:"", userPostId:"' + obj.userPostId + '", webUserId:"' + userIdString + '"}';

                //params.query = "?userId=" + userIdString + "&postId" + obj.userPostId;
                params.failFn = function(){
                    alert("Error buttonEleFuncs.js line 53");
                };
                ajax(params);
            }
        }
        else{
            obj.greyedOut = false;
        }
    };
    
    butIn.addEventListener("click", function(){ // This handles whta happens if the like button is clicked
        var increm = this.i; // local storage of i value of button obj
        var pid = "pId" + increm; // local storage of id for where the like count goes. Formatted pId(i)
        var numEle = document.getElementById(pid); //get <p> element pointed to by id="pId(i)"
        var curNum = parseInt(numEle.innerHTML); //turns current value in like <p> into numeric value to be manipulated
        
        if(this.pressedOnce === false){ // if the button hasn't been pressed yet
            this.pressedOnce = true; 
            var func = greyOut; // obtain local scope copy of greyOut function
            var obj = this;
            
            var thisCurNum = this.num;
            window.setTimeout(func, 3000, obj, thisCurNum); // after 3 seconds, grey the button out and stop allowing the user to hit the button over and over
        }
        if(this.greyedOut === false){ //if the button isn't greyed out yet, allow to click the button as many times as the user can until this.greyedOut === true
            var snd = new Audio("smw_coin.wav"); // load in sound effect
            snd.play(); // play sound effect
            
            var inc = Math.floor(Math.random() * 24); //generation of value between 1 and 24
            this.num = this.num + inc; //this.num represent total additional likes added on by this button. Add this new random value to this.num
            curNum += inc; //add the generated number to this functions local copy of the total likes
            numEle.innerHTML = curNum; //display the current like number after this button press 
        }
    });
    
}
