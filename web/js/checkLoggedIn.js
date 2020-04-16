/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function checkLoggedIn(logInSuccessFunc, logInFailFunc){
    var params = {};
    
    params.url = "webAPIs/checkIfLoggedInAPI.jsp";
    params.successFn = logInSuccessFunc;
    params.failFn = logInFailFunc;
    
    ajax(params);
}