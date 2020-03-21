/* 
 * profile.js
 * 
 * Called by index.htmll
 * An AJAX call is made to getProfileAPI.jsp, which checks the current session for a saved profile object.
 * IF one is found, the page is swapped for the profile page for the user object that is returned. Otherwise,
 * the page does not change, and the user is notified that they must be logged into to view their profile. 
 */


function profile(id){
    var content = ` <div class="contentColumn">
                        <div id="inputDiv"></div>
                        <div id="tableDiv"></div>
                   </div>`;   
    
    var params = {};
    params.url = "webAPIs/getProfileAPI.jsp";
    params.successFn = succ;
    params.failFn = fail;
    
    ajax(params);
    
    function succ(jsObjIn){
        if(jsObjIn.List[0].errorMsg === ""){
            document.getElementById(id).innerHTML = "";
            document.getElementById(id).innerHTML = content;
            makeTable(jsObjIn.List, "inputDiv", "tableDiv", "userEmail");
        }
        
        return;
    }
    
    function fail(){
        alert("You are not logged in.");
    }
    
    return;
    
    
}