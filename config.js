var config = {
    dev: {
        apiBase:"localhost:3000",
        mongodb:"mongodb://localhost/smartlyrics"
    },
    prod: {
        apiBase:"https://smartlyricsapi.herokuapp.com",
        mongodb:"mongodb://heroku_wfbc05rl:ej5054uvp77cifbc8sdueev45c@ds145892.mlab.com:45892/heroku_wfbc05rl"
    }
};
module.exports = config;