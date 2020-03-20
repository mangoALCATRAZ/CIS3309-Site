/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
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