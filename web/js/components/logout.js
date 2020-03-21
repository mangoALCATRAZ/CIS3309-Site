/* 
 * logout.js
 * 
 * Very simple. Simply makes an AJAX call to the server to execute logoffAPI.jsp,
 * which invalidates the session, resulting in a logout. This function then notifies the user once this occurs.
 */


function logout(){
    params = {};
    params.url = "webAPIs/logoffAPI.jsp";
    params.successFn = function(){
        alert("Logged off successfully!");
    };
    
    ajax(params);
    
    return;
}