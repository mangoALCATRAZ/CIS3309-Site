/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function profile(id){
    var content = ` <div class="contentColumn">
                        <div id="inputDiv"></div>
                        <div id="tableDiv"></div>
                   </div>`;   
    
    var params = {};
    params.url = "webAPIs/getProfileAPI.jsp";
    params.successFn = succ;
    
    ajax(params);
    
    function succ(jsObjIn){
        if(jsObjIn.List[0].errorMsg === ""){
            document.getElementById(id).innerHTML = "";
            document.getElementById(id).innerHTML = content;
            makeTable(jsObjIn.List, "inputDiv", "tableDiv", "userEmail");
        }
        else{
            alert(jsObjIn.List[0].errorMsg);
        }
        
        return;
    }
    
    return;
    
    
}