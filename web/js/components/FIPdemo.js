/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function FIPdemo(viewID){
    var params = {};
    params.url = "webAPIs/listPostByLikeApi.jsp"; // get list of posts in order descended bylike
    params.successFn = fill;
    
    ajax(params);
    
    var numOfPosts;
    var postIncrem = 0;
    
    var descDiv = document.createElement("div");
    descDiv.setAttribute("class", "contentColumn");
    
    var descHTML = `<h1 style="color: black">Introducing: Fake Internet Points!</h1>
                    <p style="margin-left: 25px; margin-right: 25px;">Similar in nature to Reddit Karma, Fake Internet Points are designed to be even more insignificant.<br /><br /> Instead of giving out just one, users can give out anywhere between 1 to 24 "likes" or Fake Internet Points. The user can keep clicking the like button to keep giving out a series of likes between 1 and 24, until a 3 second timer goes off and the button greys out. This is designed so that, if a post has thousands of likes, it doesn't necessarily mean that thousands of people liked it. However, the user responsible for that point will still received thousands of Fake Internet Points to add to their equally insignificant number. The idea is to cheapen the value of Likes and make the actual popularity of a post more ambiguous in an experimental way.<br /><br />The code for the button itself is stored in components/buttonEleFuncs.js and takes three parameters. butIn, the button object that the new rules will apply to. postIdIn, the database id of the post in question, and i, the number in the list of posts being displayed on screen. Attached to this is a new API that updates the amount of likes for the post in question within the database, as well as the master list of users to posts, which keeps track of whether or not a user has already liked a post so that duplicates are not allowed.<br /><br />This idea for this came from the 2019 video game Death Stranding, in which player-created objects can be liked by other players, and each player can dish out anywhere between 10-200 likes in a single instance by rapidly tapping the Like button over and over. I figured this was entertaining, and could be interesting if applied to an actual social-media setting, and decided to incorporate something similar.<br /><br /></p>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/Fnj7U0sCXDQ?start=84" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    descDiv.innerHTML = descHTML;
    document.getElementById(viewID).appendChild(descDiv);
    
    function fill(jsObjIn){
        numOfPosts = jsObjIn.List.length;
        for(var i = 0; i < jsObjIn.List.length; i++){
            
            var indexContent = `<div class="contentReverseRow">
                            <div class="userInfo" id="userInfo` + i + `">
                                
                            </div>
                            <div class="postContent" id="postContent` + i + `">
                                
                            </div>
                            
                            <div class="likeDiv">
                                <button id="but` + i + `"><img class="likeIco" id="img` + i + `" />
                                <p id="pId` + i + `"></p>
                            </div>
                        </div>`;
            var userInfoDivId = "userInfo" + i;
            var divId = "postContent" + i;
            
            var titleId = "title" + i;
            var pId = "pId" + i;
            var upImgId = "img" + i;
            
           
            
            var image = `<h1 style="color: black" id="title` + i + `">` + jsObjIn.List[i].name + `</h1>
                        <img class="postContentImg" src="` + jsObjIn.List[i].imgUrl + `" alt="test" />`;
            var userHTML = `<img class="profileImg" src="` + jsObjIn.List[i].image + `"alt="test" />
                            <p id="userName` + i + `"></p>`;
                           // <p id="fip` + i + `"></p>`;
            
            var div = document.createElement('div');
            div.innerHTML = indexContent;
            document.getElementById(viewID).appendChild(div);
            
            document.getElementById(userInfoDivId).innerHTML = userHTML;
            document.getElementById(divId).innerHTML = image;
            document.getElementById(pId).innerHTML = jsObjIn.List[i].likeCount;
            
            var pUserName = "userName" + i;
            //var pFip = "fip" + i;
            var pUserNameEle = document.getElementById(pUserName);
            pUserNameEle.innerHTML = jsObjIn.List[i].userEmail;
            //var pFipEle = document.getElementById(pFip);
           // pFipEle.innerHTML = jsObjIn.List[i].
            
            var upImgEle = document.getElementById(upImgId);
            upImgEle.src = "icons/up.png";
            
            var butId = "but" + i;
            var buttonEle = document.getElementById(butId);
            
            buttonEleFuncs(buttonEle, jsObjIn.List[i].userPostId, i);
            /*buttonEle.i = i;
            buttonEle.postId = jsObjIn.List[i].userPostId;
            buttonEle.pressedOnce = false;
            buttonEle.greyedOut = false;
            buttonEle.num = 0;
            
            buttonEle.greyOut = function(obj, thisCurNum){
                if(obj.greyedOut === false){
                    obj.greyedOut = true;
                    var upImgId = "img" + obj.i;
                    var upImgEle = document.getElementById(upImgId);
                    upImgEle.src = "icons/up_grey.png";
                    
                    var params = {};
                    params.url = "webAPIs/updateLikeCountApi.jsp";
                    params.query = "?postId=" + obj.postId + "&updateNum=" + obj.num;
                    params.failFn = function(){
                        alert("Error fipdemo.js line 63");
                    };
                    ajax(params);
                }
                else{
                    obj.greyedOut = false;
                }
            };
            
            buttonEle.addEventListener("click", function(){
               var increm = this.i;
               var pid = "pId" + increm;
               var numEle = document.getElementById(pid);
               var curNum = parseInt(numEle.innerHTML);
               
               if(this.pressedOnce === false){
                   this.pressedOnce = true;
                   var func = this.greyOut;
                   var obj = this;
                   
                   var thisCurNum = this.num;
                   window.setTimeout(func, 3000, obj, thisCurNum);
               }
               if(this.greyedOut === false){
                   var snd = new Audio("smw_coin.wav");
                   snd.play();
                   
                   var inc = Math.floor(Math.random() * 24);
                   this.num = this.num + inc;
                   curNum += inc;
                   numEle.innerHTML = curNum;
               }
                
            }); */
        }
    };
}


