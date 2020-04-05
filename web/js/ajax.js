
// ********************** ajax *************************************   
// Make an ajax call to the given url, then if the call was successful, 
// call the Success Callback fn, otherwise, set an error message into the 
// DOM element that has id 'errorId'.

/*
 * 
 * ajax.js
 * 
 * This is an implementation of ajax lifted from Sally K's ajax2.js file provided
 * in the sample code, which allowed for an open ended object holding parameters to be passed
 * to the object, dramatically increasing flexibility.
 * 
 * This was taken advantage of. Functoinality was expanded on ajax2.js in the following ways
 * 
 * 1. support for a params.failFn. This is an optional parameter that holds a function that should be
 *      executed if the httprequest either fails, or fails to find the needed information, etc. This allows
 *      conditionality in a way completely defined 
 *      
 *    if ajax() recieves any kind of JSON data back from the server, it will assume that it was a successful call
 *    and launch the successFn with that data as a parameter.
 *    
 *    if ajax() recieves anything that isn't JSON, one of three possibilities could be the case.
 *      i. The server ssnt back a differnt piece of data that isn't JSON based, such as a string.
 *      ii. The server sent back null, and the calling function specified params.failFn, meaning that the condition sought has failed, and no suitible data has been found. params.failFn() is therefore called.
 *      iii. The server sent back null, but there is no failure condition in params, so this is treated as normal output and params.successFn() is called.
 * 
 * 
 * 2. support  for a params.passFlag, which is a variable in the params that is triggered false or true
 *      depending on ajaz query conditional success or failure. If no params.failFn is specified and such a conditional
 *      requirement for received input from server is not specified, this will always evaluate to true.
 */

function ajax (params){
    
    // expecting params properties url, successFn, and errorId
    if (!params || !params.url || (!params.successFn && !params.failFn)) {
        alert ("function ajax requires an input parameter object with properties: url, successFn.");
        return;
    }

    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest(); //For Firefox, Safari, Opera
    } else if (window.ActiveXObject) {
        httpReq = new ActiveXObject("Microsoft.XMLHTTP"); //For IE 5+
    } else {
        alert('ajax not supported');
    }
    
    if(!params.query){
        params.query = "";
    }

    console.log("ready to get content " + params.url + params.query);
    var send = params.url + params.query; // url plus query, if any, to be sent in the request.
    httpReq.open("GET", send); // specify which page you want to get

    // Ajax calls are asyncrhonous (non-blocking). Specify the code that you 
    // want to run when the response (to the http request) is available. 
    httpReq.onreadystatechange = function () {

        // readyState == 4 means that the http request is complete
        if (httpReq.readyState === 4) {
            if (httpReq.status === 200) {
                
                try{
                    var obj = JSON.parse(httpReq.responseText);
                    params.successFn(obj);  // like the jQuery ajax call, pass back JSON already parsed to JS objecg
                }
                catch(Exception){
                    console.log("Error in parsing json. Treating as if there is no JSON intended to be passed, and calling function without params.");
                    if(httpReq.responseText !== null){ // not a json object, but a string was sent back
                        params.successFn(httpReq.responseText);
                        if(params.passFlag){
                            params.passFlag = true;             
                        }
                    }
                    else if(params.failFn){
                        if(params.passFlag){
                            params.passFlag = false;
                        }
                        params.failFn(); //if a failure function is specified, this is executed.
                    }
                    else{
                        params.successFn(); // if a failure function is not specified, the success function is executed without a parameter.
                    }
                }
                
            } else {
                // First use of property creates new (custom) property
                //document.getElementById(params.errorId).innerHTML = "Error (" + httpReq.status + " " + httpReq.statusText +
                        //") while attempting to read '" + params.url + "'";
                  alert("Error (" + httpReq.status + " " + httpReq.statusText +
                        ") while attempting to read '" + params.url + "'");
            }
        }
    }; // end of anonymous function

    httpReq.send(null); // initiate ajax call

} // end function ajax2