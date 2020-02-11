/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function makeTable(jsObjIn, inputDiv, tableDiv, initSort){
        
        var curJsObjIn = jsObjIn;
        
        var input = document.createElement("input");
        document.getElementById(inputDiv).appendChild(input);
    
        var table = document.createElement("table");
        document.getElementById(tableDiv).appendChild(table);
        
        var thead = document.createElement("thead");
        table.appendChild(thead);
    
        var tr_Head = document.createElement("tr");
        thead.appendChild(tr_Head);
        
        var propArr = Object.getOwnPropertyNames(jsObjIn[0]);
        for(var i = 0; i < propArr.length; i++){
            var td = document.createElement("td");
            td.innerHTML = propArr[i];
            tr_Head.appendChild(td);
            
            td.onclick = function(){
                var sortedArr = sortJsObjByProp(curJsObjIn, this.innerHTML);
                updateTable(sortedArr);
            };
        }
        
        var tbody = document.createElement("tbody");
        tbody.id = "tableBody";
        table.appendChild(tbody);
        
        var jsObjByUserId = sortJsObjByProp(jsObjIn, initSort);
        table = updateTable(jsObjByUserId, tableDiv);
        
        input.addEventListener('keyup', function(){
            var inputString = this.value;
            
            var arr = [];
            var arrIncrem = 0;
            for(var i in jsObjIn){
                if(jsObjIn[i]["userEmail"].toLowerCase().includes(inputString.toLowerCase())){
                    arr[arrIncrem] = jsObjIn[i];
                    arrIncrem++;
                }
                curJsObjIn = arr;
            }
            
            updateTable(arr);
        });
        
        function updateTable(arr){
            if(tbody.firstChild){
                table.removeChild(tbody);
            }
            tbody = document.createElement("tbody");
            table.appendChild(tbody);
            
            for(var i in arr){
                addRowWithContent(arr[i], Object.getOwnPropertyNames(arr[0]));
            }
            
            
            return table;
        }
        
        
        function sortJsObjByProp(retArr, prop){
            
            
            for (var i = 1; i < retArr.length; i++){
                if(retArr[i][prop].localeCompare(retArr[0][prop]) === -1){
                    retArr.unshift(retArr.splice(i, 1)[0]);
                }
                else if(retArr[i][prop].localeCompare(retArr[i-1][prop]) === 1){
                    continue;
                }
                else{
                    for(var j = 1; j < i; j++){
                        if(retArr[i][prop].localeCompare(retArr[j-1][prop]) === 1 && retArr[i][prop].localeCompare(retArr[j][prop]) === -1){
                            retArr.splice(j, 0, retArr.splice(i, 1)[0]);
                        }
                    }
                }
            }
            
            return retArr;
        }
        
        //function removeRowWithContent(obj, inTBody propArr, inTr){
           // inTBody.removeChild(inTr);
         //  return inTBody;
       // }
        
        function addRowWithContent(obj, propArr){
            var tr_Body = document.createElement("tr");
            tbody.appendChild(tr_Body);
            
            for (var j = 0; j < propArr.length; j++){
                var td = document.createElement("td");
                if(propArr[j].toLowerCase() === "image" || propArr[j].toLowerCase() === "imgurl" || propArr[j].toLowerCase() === "userimage"){
                    td.innerHTML = "<a href='" + obj[propArr[j]] + "'><img src='" + obj[propArr[j]] + "' alt='JSON' /></a>";
                    
                    
                }
                else{
                    td.innerHTML = obj[propArr[j]];
                }
                tr_Body.appendChild(td);
            }
       
        } 
}
