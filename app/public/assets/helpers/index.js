$(document).ready(function(){
    
    // sign up click listener
    $("#signupBtn").on("click",function(){
    // clear any auth-related messaging
        $("#message").html("<p>Attempting to create account...</p>");
    // post to authApi . . .       
        $.post("/signup",function(response){
        console.log("sign-up response:",response);
        if (response.message === "user exists") {
            $("#message").text("User exists already! Try a different username.")
        }
        else {
            $("#loginModal").modal("hide");
            // to do: update username area with welcome message
        }
    });
    });

    // log in click listener 
    $("#loginBtn").on("click",function(){
        $.post("/login",function(response){
            console.log(response);
        })
    });

    // // is there a user?
    // if (!userExists(cb)) {
    //         console.log("No user");
    //         // trigger sign in modal
    //         $("#loginModal").modal("show");
    //        }
        
    
}); // end document ready

