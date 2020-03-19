<%-- 
    Document   : logonAPI
    Created on : Mar 19, 2020, 12:06:34 AM
    Author     : woah dude
--%>


<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="StringData.*" %>

<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>
<%@page language="java" import="models.webUser.*" %>

<%
    DbConn dbc = new DbConn();
    
    StringDataList list = new StringDataList();
    list.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.

    StringData sess = new StringDataUser();
    
    
    String email = request.getParameter("email");
    String pw = request.getParameter("pass");
    
    sess = DbMods.logonFind(email, pw, dbc);
    list.add(sess);
    
    session.setAttribute("webUser", sess);
    
    dbc.close();
    
    Gson gson = new Gson();
    out.print(gson.toJson(list).trim());
   
    
    
%>
