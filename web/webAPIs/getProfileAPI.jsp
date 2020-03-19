<%-- 
    Document   : getProfileAPI
    Created on : Mar 19, 2020, 1:44:33 AM
    Author     : woah dude
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="models.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>
<%@page language="java" import="StringData.*" %>

<%
  StringDataList list = new StringDataList();
  
  
  StringData loggedIn = (StringData) session.getAttribute("webUser");
  
  if(loggedIn == null){
      list.dbError = "No object stored in attribute webUser for this session.";
  }
  else{
      list.add(loggedIn);
  }
  
Gson gson = new Gson();
out.print(gson.toJson(list).trim());

%>