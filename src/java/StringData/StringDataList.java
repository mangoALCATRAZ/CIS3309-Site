package StringData;

import StringData.StringDataUser;
import java.util.ArrayList;
import java.sql.ResultSet;
import dbUtils.*;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;


// The purpose of this class is to have a nice java object that can be converted to JSON 
// to communicate everything necessary to the web page (the array of users plus a possible 
// list level database error message). 
public class StringDataList {

    public String dbError = "";
    public ArrayList<StringDataInterface> List = new ArrayList();

    // Default constructor leaves StringDataList objects nicely set with properties 
    // indicating no database error and 0 elements in the list.
    public StringDataList() {
    }

    // Adds one StringData element to the array list of StringData elements
    public void add(StringDataInterface stringData) {
        this.List.add(stringData);
    }

    // Adds creates a StringData element from a ResultSet (from SQL select statement), 
    // then adds that new element to the array list of StringData elements.
    public void add(ResultSet results) {
        String name = "";
        try {
            ResultSetMetaData rsmd = results.getMetaData();
            name = rsmd.getColumnName(1);
            
            
        } catch (SQLException ex) {
            Logger.getLogger(StringDataList.class.getName()).log(Level.SEVERE, null, ex);
            System.out.print("StringDataList exception in add(REsultSEt results)");
            return;
        }
        
        StringDataInterface sd;
        switch (name.toLowerCase()) {
            case "user_post_id":
                sd = new StringDataPost(results);
                break;
            case "web_user_id":
                sd = new StringDataUser(results);
                break;
            default:
                System.out.println("could not find valid sql template in StringDataList.add(ResultSet)");
                return;
        }
        
        this.List.add(sd);
    }
}
