<%-- 
    Document   : getProfileAPI
    Created on : Mar 19, 2020, 1:44:33 AM
    Author     : woah dude

    getProfileAPI.jsp

    This is the server-side code for loading a profile.

    profile.js sents an AJAX HTTP request to this script, which simply just checks the current
    session for the existence of an entry under the name "webUser". This represents the current login, 
    and if such an object exists, that object is a formatted StringData of the logged in user's database entry.

    If it is found, it is out-printed back to the client, where js handles organizing it on the page.
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
      Gson gson = new Gson();
      out.print(gson.toJson(list).trim());
  }
  

%>