/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var login = {};

login.msgId = "";

login.UI = function(id){
    var content = '<div class="content">\n\
                        <br />Email Address<input type="text" id="loginEmail" />\n\
                        <br />Password<input type="password" id="loginPass"/>\n\
                        <br /><input type="button" value="submit" onclick="login.findUser("loginEmail", "loginPass", "msgArea")/>\n\
                        <br /><br />\n\
                        <div id="msgArea"></div>\n\
                   </div>';
    document.getElementbyId(id).innerHTML = content;
    
    
};

login.findUser = function(emailIn, passIn, msgIdIn){
    window.location.search = "?email=" + emailIn + "&pass=" + passIn; // page refreshes after this
    this.msgId = msgIdIn;
    
    ajax("webAPIs/logonAPI.jsp", this.results);
    // query is picked up by server-side and is handled.
    
    
};
login.results = function(jsObjIn){
    var content = `<div class="contentColumn">
                        <div id="inputDiv"></div>
                        <div id="tableDiv"></div>
                   </div>`;
    
    var err = jsObjIn.List[0].errorMsg;
    if(err !== ""){
        alert(err);
    }
    else{
        document.getElementByID(this.msgId).innerHTML = "";
        document.getElementById(this.msgId).innerHTML = content;
        makeTable(jsObjIn.List, "inputDiv", "tableDiv", "userEmail");
    }
};