import $ from "jquery";
const resource = "https://smartlyricsapi.herokuapp.com";
const ajax = {
    
    signup: (userInfo,error,success) =>  {
         $.post(`${resource}/api/signup`,userInfo, (response)=>{
            if (!response.success) {
                error(response.message)
            }
            else {
                success(response)
                }
            })
        },

    login: (userInfo,error,success) => {
        $.post(`${resource}/api/login`,userInfo, (response) =>{
            if(!response.success) {
                error(response.message)
            }
            else {
                success(response)
                }
            })
        },

    search: (input,error,success) =>{
        console.log("Attempting search on ",input);
        $.post(`${resource}/api/search`,input,(response) => {
            if(response.length===0) {
                error("Sorry, there was a problem, or no results.")
            }
            else {
                success(response);
            }
        })
    },

    // hit our api to retrieve favorites
    favorites: (input,error,success) =>{
        $.get(`${resource}/api/favorites/${input}`,(response) => {
            if(response.length===0) {
                error("Sorry, there was a problem, or no results.")
            }
            else {
                success(response)
            }
        })
    },

    // hit our api to post a favorite
    favorite: ( song ) => {

        // request should include title , artist, song_id, image url, lyrics page url
        $.post(`${resource}/api/favorites`,song,(response) => {
            console.log("response:",response)      
        })
    }

}

export default ajax;