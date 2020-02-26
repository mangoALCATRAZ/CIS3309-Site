package view;

// classes imported from java.sql.*
import StringData.StringDataList;
import StringData.StringDataUser;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

// classes in my project
import dbUtils.*;

public class WebUserView {

    public static StringDataList getAll(DbConn dbc, String sql) {

        //PreparedStatement stmt = null;
        //ResultSet results = null;
        StringDataList sdl = new StringDataList();
        
        if(sql == null){
            return null; // no valid sql provided.
        }
        
        try {
            
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringDataUser sd = new StringDataUser();
            sd.errorMsg = "Exception thrown in WebUserView.allUsersAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}