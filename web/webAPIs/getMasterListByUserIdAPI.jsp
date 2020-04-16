<%-- 
    Document   : getMasterListByUserIdAPI
    Created on : Apr 6, 2020, 10:09:02 AM
    Author     : woah dude
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page language="java" import="dbUtils.*"%>
<%@page language="java" import="StringData.StringDataList"%>
<%@page language="java" import="com.google.gson.*"%>
<%@page language="java" import="models.userLikePost.*"%>

<%
    DbConn dbc = new DbConn();
    StringDataList list = new StringDataList();
    list.dbError = dbc.getErr();
    if(list.dbError.length() == 0){
        
        String userId = request.getParameter("userId");
        
        list = DbMods.getMasterListByUserId(userId, dbc);
        
        
    }
    dbc.close();
    
    Gson gson = new Gson();
    out.print(gson.toJson(list));

%>
