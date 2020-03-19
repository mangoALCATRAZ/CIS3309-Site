/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package StringData;

import view.*;
import java.sql.ResultSet;

/**
 *
 * @author woah dude
 */
public abstract class StringData{

    
    public String errorMsg = "";
    public abstract int getCharacterCount();
    
    @Override
    public abstract String toString();
}
