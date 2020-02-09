/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function makeTable(jsObjIn, inputDiv, tableDiv){
        
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
        }
        
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);
        
        for(var i in jsObjIn){
            var tr_Body = document.createElement("tr");
            tbody.appendChild(tr_Body);
            
            for(var j = 0; j < propArr.length; j++){
                var td = document.createElement("td");
                if(propArr[j] === "image"){
                    td.innerHTML = "<img alt='json' src='" + jsObjIn[i][propArr[j]] + "' />";
                }
                else{
                    td.innerHTML = jsObjIn[i][propArr[j]];
                }
                tr_Body.appendChild(td);
            }
        }
        
}
