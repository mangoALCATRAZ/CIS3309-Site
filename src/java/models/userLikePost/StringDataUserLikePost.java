/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package models.userLikePost;

import StringData.StringData;
import dbUtils.FormatUtils;
import java.sql.ResultSet;
/**
 *
 * @author woah dude
 */
public class StringDataUserLikePost extends StringData{
    
    public String userLikePostId = "";
    public String userPostId = "";
    public String webUserId = "";
    
    public StringDataUserLikePost(){
        
    }
    
    public StringDataUserLikePost(ResultSet results){
        try{
            this.userLikePostId = FormatUtils.plainInteger(results.getObject("user_like_post_id"));
            this.userPostId = FormatUtils.plainInteger(results.getObject("user_post_id"));
            this.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));
            
        } catch(Exception e){
            this.errorMsg = "Exception thrown in model.userLikePost.StringData";
        }
        
    }
    
    @Override
    public int getCharacterCount(){
        String s = this.userLikePostId + this.userPostId + this.webUserId;
        return s.length();
    }
    
    @Override
    public String toString(){
        return "User-Like-Post Id: " + this.userLikePostId
                + ", User Post Id: " + this.userPostId
                + ", Web User Id: " + this.webUserId;
    }
}
