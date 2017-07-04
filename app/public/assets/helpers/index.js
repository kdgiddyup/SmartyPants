$(document).ready(function(){

    // launch sign up modal 
    $("#signinModalBtn").on("click",function(){
        $("#loginModal").modal("show");
        })

    // catch sign up form submit

    $("#signup").submit(function() { 
        
        // update auth-related messaging
        $("#message").html("<p>Attempting to create account...</p>");
        $.post("/signup",$(this).serialize(), function(response){
            console.log("sign-up response:",response);
            if (!response.success)  {
                $("#message").text("User exists already! Try a different username.")
            }
            else {
                $("#loginModal").modal("hide");
                $("#userGreeting").text(`Welcome, ${response.message}`);
                }
            });
            // prevent form from submitting 
            return false;
    });

   
    // catch log in form submit
    $("#login").submit(function(){
        //auth message
        $("message").html("<p>Attempting to log you in...</p>");
        $.post("/login",$(this).serialize(),function(response){
            console.log("log-in response:",response);

        });
        //prevent form from submitting
        return false;
    });
        
    
}); // end document ready

