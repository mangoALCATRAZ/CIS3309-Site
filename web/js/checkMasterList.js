/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function checkMasterList(userPostId, masterListObj){
    var ret = false;
    
    // simply a linear search for now. As the website
    // gets larger, implement a design that allows
    // differnt search algorithms to be used and switched out
    // on the fly, defined by other js functions.
    
    for(var i = 0; i < masterListObj.List.length; i++){
        
        if(masterListObj.List[i].userPostId === userPostId){
            ret = true;
            break;
        }
        
    }
    
    return ret;
}
