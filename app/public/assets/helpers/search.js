// what happens when search button is clicked?
  $(document).ready(function(){
    $("#lyricsSearchButton").on("click",function(){
      var input=$("#lyricsSearch").val().trim();
      console.log("searching",input);
      
      // we'll send input and user, since we'll use user info in back end to check on favorited status of songs
      $.post("api/search/",{input,user},function(data){
        renderSearchResults(data.songs);
      });
    })

     }) // end ready function

function renderSearchResults(songs){
    // takes in genius api  search results
    // we'll store results in a globally available object
    var results ={};
    
    // replace any previous results with the header
    $("#resultsList").html("<h4>Results</h4>");
    
    // loop through api call results and extract data
    $(songs).each(function(index,element){
      // add properties to global results object, including current user, who will be associated with any favoriting action
      results[element.song_id] = {
      title: element.title,
      artist: element.artist,
      image: element.thumb,
      lyrics: element.lyrics,
      user: user,
      favorite: element.favorite  // will either be 'favorited' or ''; this value will become the class on the "favorite" button
    };
      
      // generate HTML
      var thisSong = $("<div>").attr({"class":"song col-lg-12","data-song-id":element.id});
  
      // build up song div 
      thisSong.append(`<h2>${element.title} <span class="glyphicon glyphicon-align-justify lyricsButton" data-song-id=${element.song_id} data-toggle="modal" data-target="#lyricsModal" aria-hidden="true" data-lyrics-url=${element.lyrics}></span> <span class="glyphicon glyphicon-heart favoriteButton ${element.favorited}" data-song-id=${element.song_id} aria-hidden="true"></span> </h2>`);
  
      thisSong.append(`<p class="artist">${element.artist}</p>`);
      
      // add song div to display 
      $("#resultsList").append(thisSong); 
    }); // end add song results loop
   
    // attach click listener to lyrics buttons
    $(".lyricsButton").on("click",function(){
      
      //clear hidden modal window of any previous search results
      $("#lyricsModalTitle").html("Searching . . . ");
       $("#lyricsModalBody").html(" <i class=\"fa fa-spinner fa-pulse fa-3x fa-fw\"></i>");

      // what song is this?
      var thisSong = $(this).attr("data-song-id");
      
      fetchLyrics(thisSong,results);

  });  // end lyrics button click function
  
  // attach click listener to favorites buttons
  $(".favoriteButton").on("click",function(){
    var thisSong = $(this).attr("data-song-id");
    
    // build a post body:
    var body = {"title":results[thisSong].title,"artist":results[thisSong].artist,"song_id":thisSong,image:results[thisSong].image,lyrics:results[thisSong].lyrics,user:results[thisSong].user};
    
    $.post("/api/favorites",body,function(data){
      console.log("Favorited",data);
      });
  });

  $(`.favoriteButton[data-song-id='${data.song_id}']`).addClass("favorite");
} // end renderSearchResults function