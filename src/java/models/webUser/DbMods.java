/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package models.webUser;
import dbUtils.DbConn;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
/**
 *
 * @author woah dude
 */
public class DbMods {
    public static StringDataUser logonFind(String email, String pw, DbConn dbcIn){
        StringDataUser foundData = new StringDataUser();
        if((email == null) || (pw == null)){
            foundData.errorMsg = "model.webUser.DbMods.logonFind error: email or pw null";
            return foundData;
        }
        
        try{
            String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, image, "
                    + "web_user.user_role_id, user_role_type "
                    + "FROM web_user, user_role "
                    + "WHERE web_user.user_role_id = user_role.user_role_id "
                    + "AND user_email = ? and user_password = ?;";
            PreparedStatement pStatement = dbcIn.getConn().prepareStatement(sql);
            pStatement.setString(1, email);
            pStatement.setString(2, pw);
            ResultSet results = pStatement.executeQuery();
            if(results.next()){
                return new StringDataUser(results);
            }
            else{
                return null;
            }
            
        }
        catch(Exception e){
            foundData.errorMsg = "Exception in model.webUser.DbMods.logonFind(): " + e.getMessage();
            System.out.println("*******" + foundData.errorMsg);
            return foundData;
        }
    }
}
