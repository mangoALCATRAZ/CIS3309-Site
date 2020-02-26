<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="StringData.*" %>

<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    StringDataList list = new StringDataList();

    DbConn dbc = new DbConn();
    list.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.

    if (list.dbError.length() == 0) { // if got good DB connection,

        System.out.println("*** Ready to call allUsersAPI");
        String sql = "SELECT user_post_id, name, img_url, description, like_count, date, web_user.user_email, web_user.image " +
                    "FROM user_post, web_user WHERE user_post.web_user_id = web_user.web_user_id " +
                    "ORDER BY user_post_id;";


        list = WebUserView.getAll(dbc, sql);
        if(list == null){
            System.out.print("error: listPostAPI.jsp");
            return;
        }
    }

      dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.

    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(list).trim());
%>