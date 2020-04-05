<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="StringData.*" %>

<%@page language="java" import="view.WebUserView" %>
<%@page language="java" import="java.sql.PreparedStatement" %>
<%@page language="java" import="java.sql.ResultSet" %>
<%@page language="java" import="com.google.gson.*" %>

<%
    StringDataList list = new StringDataList();
    
    String post_id = request.getParameter("postId");
    String update_num = request.getParameter("updateNum");
    
    DbConn dbc = new DbConn();
    list.dbError = dbc.getErr();
    
    if(list.dbError.length() == 0){
        String sql = "UPDATE user_post "
                + "SET like_count = like_count + ? "
                + "WHERE user_post_id = ?";
        try{
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);
            pStatement.setString(1, update_num);
            pStatement.setString(2, post_id);
            int ret = pStatement.executeUpdate();
        }
        catch(Exception e){
            System.out.print(e);
        }
        
        
    dbc.close();
        
        
    }
%>