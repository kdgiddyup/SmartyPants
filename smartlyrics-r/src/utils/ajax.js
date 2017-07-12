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
    // song is an object of song data
    favorite: ( song, error, success ) => {

        // request should include title , artist, song_id, image url, lyrics page url
        $.post(`${resource}/api/favorites`,song,(response) => {
            if (!response.success) {
                error(response.message)
            }
            else {
                success(response.song_id)  
            }    
        })
    },

    // hit our api to remove a favorite
    // here, we only need song_id
    remove: ( song_id, error, success ) => { 
        $.get(`${resource}/api/remove/${song_id}`, (response) => {
            if (!response.success) {
                error(response.message)
            }
        })
    .then(function(response){
        console.log("remove song raw response:",response.data);
        res.send(response.data)
    })
    .catch(function (error) {
        console.log(error);
    });
    })

}

export default ajax;