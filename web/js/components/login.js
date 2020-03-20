/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var login = {};

login.msgId = "";

login.UI = function(id){
    var content = '<div class="content">\n\
                        <br />Email Address<input type="text" name="loginEmail" id="loginEmail" />\n\
                        <br />Password<input type="password" name="loginPass" id="loginPass"/>\n\
                        <br /><input type="button" id="loginButton" value="submit" onclick="login.findUser(document.getElementById(`loginEmail`).value, document.getElementById(`loginPass`).value, `msgArea`)" />\n\
                        <br /><br />\n\
                        <div id="msgArea"></div>\n\
                   </div>';
    window.location.search = "";
    document.getElementById(id).innerHTML = content;
    
    //document.getElementById("loginButton").addEventListener("click", login.findUser(document.getElementById("loginEmail").value, document.getElementById("loginPass").value), "msgArea");
};

login.findUser = function(emailIn, passIn, msgIdIn){
    var URLappend = "?email=" + emailIn + "&pass=" + passIn; // page refreshes after this
  //  history.pushState(null, '', URLappend); // should append the current url without refreshing. this took forever to figurre out.
    this.msgId = msgIdIn;
    
    var pleaseWait = "<p>Plesae Wait...</p>";
    document.getElementById(this.msgId).innerHTML = pleaseWait;
    
    var params = {};
    params.url = "webAPIs/logonAPI.jsp";
    params.successFn = login.results;
    params.query = URLappend;
    
    
    //ajax("webAPIs/logonAPI.jsp", this.results); //old, pre ajax2 implementation
    ajax(params);
    // query is picked up by server-side and is handled.
    
    
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
        document.getElementById("msgArea").innerHTML = "";
        document.getElementById("msgArea").innerHTML = content;
        makeTable(jsObjIn.List, "inputDiv", "tableDiv", "userEmail");
    }
};