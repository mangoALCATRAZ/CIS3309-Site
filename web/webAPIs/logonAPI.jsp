<%-- 
    Document   : logonAPI
    Created on : Mar 19, 2020, 12:06:34 AM
    Author     : woah dude

    logonAPI.jsp

    This is the server-side logon code. The login.js sends an AJAX http request to this script, with 
    a query formatted "?email=yourEmail&pass=yourPass". 

    This .jsp establishes a connection to the database using DbConn, retrieves the email and pass information
    from the request query, and uses DbMods for webUsers to query the database for whether or not a record exists
    with that unique email and pass combination.

    If so, the active session is changed to an object represnting that record, and the record is sent back to the user to observe.
    The user is then considered to be logged in.
--%>


<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="StringData.*" %>

<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>
<%@page language="java" import="models.webUser.*" %>

<%
    StringData loggedIn = (StringData) session.getAttribute("webUser");
    if(loggedIn == null){
    
        DbConn dbc = new DbConn();
    
        StringDataList list = new StringDataList();
        list.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.

        StringDataUser sess = new StringDataUser();
    
    
        String email = request.getParameter("email");
        String pw = request.getParameter("pass");
    
        sess = DbMods.logonFind(email, pw, dbc);
        list.add(sess); // results are added to the output
    
        session.setAttribute("webUser", sess);
        session.setAttribute("id", sess.webUserId);
    
        dbc.close();
    
        Gson gson = new Gson();
        out.print(gson.toJson(list).trim());
    
    }
%>
