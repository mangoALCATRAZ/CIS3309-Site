<%-- 
    Document   : checkSession
    Created on : Mar 20, 2020, 6:26:25 PM
    Author     : woah dude

A completely unfinished and currently unused checker script that simply returns whether one is logged
in or not. 

Deprecated as of currently but perhaps not for long?
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    
    Object login = session.getAttribute("webUser");
    
    if(login != null){ // you're already logged in! alert
        Object ret = session.getAttribute("id");
        
        String retString = ret.toString();
        
        out.print(ret);
    }
    
    else{
        out.print("err");
    }
    
%>