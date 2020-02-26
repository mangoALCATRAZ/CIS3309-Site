/* 
 * Injects blog.html content into div with id specified.
 */

function blog(viewID){
    var blogContent = `<div class="content">
                            <p class="centerText">Blog 1 - Initial Website Structure - 1/19/2020<br /><br />This exercise, beginning with the construction of the dropdown navbar, gave me a much-needed crash course in JavaScript. This was helpful in ensuring a perfectly fluid layout, as well. I was already familiar with designing using HTML and CSS, but initially when I learned JavaScript I found the concept of the DOM confusing, and this halted my progress. However, now that I have experience with OOP, the DOM came easy to me and I was able to use JS for various things.<br /><br />I experimented heavily with extensibility in this build. I designed everything so that an arbitrary number of elements, such as content boxes (which this blog is in!), can be added and removed without breaking the site. This should come in handy in the future. CSS flexboxes also were invaluable for easily adjusting the positioning of common elements in a consistent and easily-made-fluid way. These are used alongside with custom-written JS code to create a flexible, extendible layout that can be used for a variety of things. For example, this blog.html page only took around 2 minutes to make due to these preadjustments.<br /></p>
                            <img class="leftImg" src="pics/mgs2Screenshot.png" alt="la le lu li lo" />
                       </div>
                       <div class="content">
                            <p class="centerText">Blog 2 - DB Setup and Routing Framework - 1/26/2020<br /><br />The database portion of this exercise was easy enough. I already have experience working with MySQL and relational database software, so I did not have much trouble following along with the instructions and understanding the SQL syntax. The main difficulty encountered in this portion was just relearning the rules of SQL syntax and how the MySQL software works, as well as setting up the network connection: that took some time. <br /><br />Here is a <a href="angelucci_HW2_submission.docx">link to the Word Document</a> for the DB portion of this HW submission.<br /><br />The routing portion of this assignment, on the other hand, was completely foreign to me. However, I studied the more advanced piece of sample code provided and managed to develop and understanding as to how the consumer/producer functionality of this framework operate. I can see that this is a useful setup, as the current framework allows for extensibility, largely remaining the same despite website changes. All of the parameters are set in the HTML document, meaning that the function is allocated just for its use, and doesn't need to be altered when website data changes. This should be incredibly useful moving forward. Once I understood the functionality of this framework, the assignment became easier. It was the understanding part that took time.<br /></p>'
                       </div>
                       <div class="content">
                            <p class="centerTExt">Blog 5 - Web API P"
                       </div>`;
    
    document.getElementById(viewID).innerHTML = blogContent;
}

