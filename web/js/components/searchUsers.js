/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function searchUsers(inBox){
    var params = {};
    params.url = "webAPIs/listUsersApi.jsp";
    params.successFn = fill;
    
    
    //ajax("webAPIs/listUsersApi.jsp", fill); // old pre-ajax2 implementation
    ajax(params);
    
    
    
    var content = `<div class="contentColumn">
                        <div id="inputDiv"></div>
                        <div id="tableDiv"></div>
                   </div>`;
    document.getElementById(inBox).innerHTML = ""; // clears content
    document.getElementById(inBox).innerHTML = content;
    function fill(jsObjIn){
        if(jsObjIn.dbError.length > 0){
            document.getElementById(inBox).innerHTML = jsObjIn.dbError;
        }
        else{
            makeTable(jsObjIn.List, "inputDiv", "tableDiv", "webUserId");
        }
        
    }
   
    
    
    
}