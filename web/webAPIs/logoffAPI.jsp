<%-- 
    Document   : logoffAPI
    Created on : Mar 19, 2020, 1:42:53 AM
    Author     : woah dude

    logoffAPI.jsp

    Very simple. Called via AJAX http request from logout.js. 

    Simply invalidates the current user session, erasing the stored webUser object
    and rending the user logged out.
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
   session.invalidate();
%>