<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="StringData.*" %>
<%@page language="java" import="models.userLikePost.*" %>"
<%@page language="java" import="com.google.gson.*"%>


<%
    Gson gson = new Gson();
    
    DbConn dbc = new DbConn();
    StringDataList list = new StringDataList();
    StringDataUserLikePost errorMsgs = new StringDataUserLikePost();
    
    
    String jsonInsertData = request.getParameter("jsonData");
    if(jsonInsertData == null){
        errorMsgs.errorMsg = "Cannot insert -- no data was received";
        //System.out.println(errorMsgs.errorMsg);
    }
    else{
        //System.out.println("jsonInsertData is " + jsonInsertData);
        errorMsgs.errorMsg = dbc.getErr();
        if(errorMsgs.errorMsg.length() == 0){
            System.out.println("insertMasterList.jsp -- ready to insert!");
            
            // must use gson to convert JSON (that the user provided as part of 
            //      the url: the jsonInsertData
            
            StringDataUserLikePost insertData = gson.fromJson(jsonInsertData, StringDataUserLikePost.class);
            
            errorMsgs = DbMods.insert(insertData, dbc);
        }
    }
    list.add(errorMsgs);
    dbc.close();
    
    out.print(gson.toJson(list).trim());
%>