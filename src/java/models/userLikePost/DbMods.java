/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package models.userLikePost;

import dbUtils.DbConn;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import StringData.StringDataList;

import dbUtils.ValidationUtils;


/**
 *
 * @author woah dude
 */
public class DbMods {
    public static StringDataList getMasterListByUserId(String userId, DbConn dbcIn){
        StringDataList out = new StringDataList();
        StringDataUserLikePost foundData;
        
        if(userId == null){
            out.dbError = "no userId supplied";
            return out;
        }
        
        try{
            String sql = "SELECT user_like_post_id, user_post_id, web_user_id "
                    + "FROM user_like_post "
                    + "WHERE web_user_id = ? ";
            
            PreparedStatement pStatement = dbcIn.getConn().prepareStatement(sql);
            pStatement.setString(1, userId);
            ResultSet results = pStatement.executeQuery();
            while(results.next()){
                foundData = new StringDataUserLikePost(results);
                out.add(foundData);
            }
        }
        catch(Exception e){
            out.dbError="db exception" + e.getMessage();
            return out;
        }
        out.dbError = "";
        return out;
    }
    
    public static StringDataUserLikePost insert(StringDataUserLikePost inputData, DbConn dbc){
        
        StringDataUserLikePost errorMsgs = new StringDataUserLikePost();
        errorMsgs = validate(inputData);
        
        if(errorMsgs.getCharacterCount() > 0){
            errorMsgs.errorMsg = "Please try again.";
            return errorMsgs;
        }
        else{
            String sql = "INSERT INTO user_like_post (user_post_id, web_user_id) "
                    + "values (?,?)";
            
            int numRows = -1;
            try{
                PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);
                
                pStatement.setString(1, inputData.userPostId);
                pStatement.setString(2, inputData.webUserId);
                
                
                numRows = pStatement.executeUpdate();
            } catch(Exception e){
                errorMsgs.errorMsg = e.getMessage();
                return errorMsgs;
            }
            
            if(errorMsgs.errorMsg.length() == 0){
                if(numRows == 1){
                    errorMsgs.errorMsg = "";
                } else{
                    errorMsgs.errorMsg = numRows + " records were insert when exactly 1 was expected.";
                }
            } else if(errorMsgs.errorMsg.contains("foreign key")){
                errorMsgs.errorMsg = "invalid foreign key";
            } else if(errorMsgs.errorMsg.contains("Duplicate entry")){
                errorMsgs.errorMsg = "duplicate key error";
            }
            
        }
        
        return errorMsgs;
    }
    
    public static StringDataUserLikePost validate(StringDataUserLikePost in){
        StringDataUserLikePost errorMsgs = new StringDataUserLikePost();
        
        /*
        
        public String userLikePostId = "";
        public String userPostId = "";
        public String webUserId = "";
        */
        errorMsgs.userLikePostId = ValidationUtils.integerValidationMsg(in.userLikePostId, false);
        errorMsgs.userPostId = ValidationUtils.integerValidationMsg(in.userPostId, true);
        errorMsgs.webUserId = ValidationUtils.integerValidationMsg(in.webUserId, true);
        
        return errorMsgs;
        
    }
}
