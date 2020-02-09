/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function ajax(url, func){
    var httpReq = new XMLHttpRequest();
    if(!httpReq){
        alert('Cannot create XMLHTTP interface');
        return false;
    }
    
    httpReq.onreadystatechange = parseFunction;
    httpReq.open('GET', url);
    httpReq.send();
    
    function parseFunction(){
        if(httpReq.readyState === XMLHttpRequest.DONE){
            if(httpReq.status === 200){
                var rawJSON = httpReq.responseText;
                console.log(rawJSON);
                var jsObj = JSON.parse(rawJSON);
                func(jsObj);
            }
        }
    }
}
