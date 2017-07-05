$(document).ready(function(){
    // clear modal window inputs from any possible previous activity
    clearInputs();

    // some fancy tooltips will be nice
    $('[data-toggle="tooltip"]').tooltip();

    // check local storage for a current user
    // first, does the browser support local storage?
    if (typeof(Storage) !== "undefined") {
        // try to retrieve any current user stored from previous log-in
        if (localStorage.getItem("sl_user")) {
            var user = localStorage.getItem("sl_user");
            $("#userGreeting").html(`Welcome, ${user}`);
            
            // hide sign-in button and show sign-out button   
            $("#signinModalBtn").hide();
            $("#signoutBtn").show();
        }
        else {
            $("#userGreeting").html("Welcome. Please sign up or log in!");
            $("#signinModalBtn").show();
            $("#signoutBtn").hide();
            $("#menuBtns").hide();
            }
        }
        else {
        console.log("No local storage supported");
        $("#userGreeting").html("Welcome. Please sign up or log in!");
    };

    // click listener for sign up modal 
    $("#signinModalBtn").on("click",function(){
        $("#loginModal").modal("show");
        })
    
    // hide and set click listener for sign out button
    $("#signoutBtn").on("click",function(){
        // remove user's entry from local storage
        localStorage.removeItem("sl_user");
        // return to homepage route
        window.open("/","_self");
        });

    // catch sign up form submit
    $("#signup").submit(function() { 
        
        // update auth-related messaging
        $("#message").html("<p>Attempting to create account...</p>");
        $.post("/api/signup",$(this).serialize(), function(response){
            console.log("sign-up response:",response);
            if (!response.success)  {
                $("#message").html(`Sorry, there was a problem: ${response.message}`);
            }
            else {
                $("#loginModal").modal("hide");
                $("#userGreeting").html(response.message);
                // do successful log-in things
                loginActions(response);
                }
            });
            // prevent form from submitting 
            return false;
    });

   
    // catch log-in form submit
    $("#login").submit(function(){
        //auth message
        $("message").html("<p>Attempting to log you in...</p>");
        $.post("/api/login",$(this).serialize(),function(response){
            if(!response.success) {
                $("#message").html(`<p>${response.message}</p>`);
                $("#loginModal > input").empty();
            }
            else {
                $("#userGreeting").html(response.message);
                $("#loginModal").modal("hide");
                // do successfull log-in things
                loginActions(response)
                }
            console.log("log-in response:",response);

        });
        //prevent form from submitting
        return false;
    });
        
    
}); // end document ready

function loginActions(userInfo){
    // Store user in local storage
    localStorage.setItem("sl_user", userInfo.user);

    // clear inputs
    clearInputs();

    // hide sign-in button and show sign-out button   
    $("#signinModalBtn").hide();
    $("#signoutBtn").show();
    $("#menuBtns").show();
}

function clearInputs(){
    $("#loginModal" > "input").val("");
}