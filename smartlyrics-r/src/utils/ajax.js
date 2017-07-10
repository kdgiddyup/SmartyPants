import $ from "jquery";
const resource = "https://smartlyricsapi.herokuapp.com";
const ajax = {
    
    signup: (userInfo,error,success) =>  {
         console.log("post attempt with ",userInfo);
         $.post(`${resource}/api/signup`,userInfo, (response)=>{
            console.log(`Sign-up response: ${response}`);
            if (!response.success) {
                console.log(`Message: ${response.message}`);
                error(response.message)
            }
            else {
                success(response)
                }
            })
        },

    login: (userInfo,error,success) => {
        $.post(`${resource}/api/login`,userInfo, (response) =>{
            console.log(`Log-in response: ${response}`);
            if(!response.success) {
                this.message(response.message)
            }
            else {
                success(response)
                }
            })
        }
}

export default ajax;