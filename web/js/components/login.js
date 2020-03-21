/* 
 * login.js
 * 
 * This is a complecated procedure, so an object oriented approach was used.
 * 
 * Index.html calls login.UI, whicch uses the routing framework to change the
 * page to the login screen.
 
   login.findUser(emailIn, passIn, msgIdIN)
        This constructs a URL query based on the user input email and password, and is triggered
        when the user submits the login button. An AJAX call is made using this query to 
        obtain the login record from the server and database.
        
   login.results(jsObjIn)
        This is called by the AJAX method executed in login.findUser and should be supplied as 
        params.successFn in login.findUser. This takes a JSON-parsed js object and outputs it
        using makeTable.js
 */


var login = {};

login.msgId = "";

login.UI = function(id){
    
    //var flag = login.check(); // dummied out login validation code. cut for time
    
    //if(flag === true){
       // alert("You are already logged in!");
   // }
    //else{
        var content = '<div class="contentColumn">\n\
                        <br />Email Address<input type="text" name="loginEmail" id="loginEmail" />\n\
                        <br />Password<input type="password" name="loginPass" id="loginPass"/>\n\
                        <br /><input type="button" id="loginButton" value="submit" onclick="login.findUser(document.getElementById(`loginEmail`).value, document.getElementById(`loginPass`).value, `msgArea`)" />\n\
                        <br /><br />\n\
                        <div id="msgArea"></div>\n\
                   </div>';
        window.location.search = "";
        document.getElementById(id).innerHTML = content;
    
        //document.getElementById("loginButton").addEventListener("click", login.findUser(document.getElementById("loginEmail").value, document.getElementById("loginPass").value), "msgArea");
   // }
};

/* login.check = function(){
    var params = {};
    
    params.url = "webAPIs/checkIfLoggedInAPI.jsp";
    params.successFn = function(inString){
        alert("You're already logged " + inString);
        this.ajaxDone = true;
        
    };
    params.failFn = function(){
        console.log("not logged in, proceeding to login screen");
        this.ajaxDone = true;
    };
    params.passFlag = false;
    params.ajaxDone = false;
    
    ajax(params);
    
    while(params.ajaxDone === false){
        console.log(".");
    }
    
    return params.passFlag;
    
    
}; */
login.findUser = function(emailIn, passIn, msgIdIn){
    var URLappend = "?email=" + emailIn + "&pass=" + passIn; // page refreshes after this
  //  history.pushState(null, '', URLappend); // should append the current url without refreshing. this took forever to figurre out.
    this.msgId = msgIdIn;
    
    var pleaseWait = "<p>Plesae Wait...</p>";
    document.getElementById(this.msgId).innerHTML = pleaseWait;
    
    var params = {};
    params.url = "webAPIs/logonAPI.jsp";
    params.successFn = login.results;
    params.failFn = login.alreadyLoggedIn;
    params.query = URLappend;
    
    
    //ajax("webAPIs/logonAPI.jsp", this.results); //old, pre ajax2 implementation
    ajax(params);
    // query is picked up by server-side and is handled.
    
    
};

login.alreadyLoggedIn = function(){
    alert("Please log out of the current user session first!");
    location.reload();
};

login.results = function(jsObjIn){
    var content = `<div class="contentColumn">
                        <div id="inputDiv"></div>
                        <div id="tableDiv"></div>
                   </div>`;
    
    var err = jsObjIn.List[0].errorMsg;
    if(err !== ""){
        document.getElementById("msgArea").innerHTML = "";
        alert(err);
        
    }
    else{
        document.getElementById("viewBox").innerHTML = "";
        document.getElementById("viewBox").innerHTML = content;
        makeTable(jsObjIn.List, "inputDiv", "tableDiv", "userEmail");
    }
};