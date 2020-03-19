package models.userPost;

import StringData.StringData;
import dbUtils.*;
import java.sql.ResultSet;


/* The purpose of this class is just to "bundle together" all the 
 * character data that the user might type in when they want to 
 * add a new Customer or edit an existing customer.  This String
 * data is "pre-validated" data, meaning they might have typed 
 * in a character string where a number was expected.
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let the JSP page have
 * free access to put data in or take it out. */
public class StringDataPost extends StringData{ 

    public String userPostId = "";
    public String name = "";
    public String imgUrl = "";
    public String description = "";
    public String likeCount = "";
    public String date = "";
    public String userEmail = "";   // Foreign Key
    public String image = ""; // getting it from joined user_role table.

    // default constructor leaves all data members with empty string (Nothing null).S
    public StringDataPost() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringDataPost(ResultSet results) {
        try {
            // plainInteger returns integer converted to string with no commas.
            this.userPostId = FormatUtils.plainInteger(results.getObject("user_post_id"));
            this.name = FormatUtils.formatString(results.getObject("name"));
            this.imgUrl = FormatUtils.formatString(results.getObject("img_url"));
            this.description = FormatUtils.formatString(results.getObject("description"));
            this.likeCount = FormatUtils.plainInteger(results.getObject("like_count"));
            this.date = FormatUtils.formatDate(results.getObject("date"));
            this.userEmail = FormatUtils.formatString(results.getObject("user_email"));
            this.image = FormatUtils.formatString(results.getObject("image"));
        } catch (Exception e) {
            this.errorMsg = "Exception thrown in model.webUser.StringData (the constructor that takes a ResultSet): " + e.getMessage();
        }
    }
    
    @Override
    public int getCharacterCount() {
        String s = this.userPostId + this.name + this.imgUrl + this.description + this.likeCount
                + this.date + this.userEmail + this.image;
        return s.length();
    }

    @Override
    public String toString() {
        return "User Post Id:" + this.userPostId
                + ", Post Name: " + this.name
                + ", Image URL: " + this.imgUrl
                + ", Description: " + this.description
                + ", Like Count: " + this.likeCount
                + ", Date: " + this.date
                + ", User Email: " + this.userEmail
                + ", User Image: " + this.image;
    }


}
