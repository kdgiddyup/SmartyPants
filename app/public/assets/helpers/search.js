// what happens when search button is clicked?
  $(document).ready(function(){
    $("#lyricsSearchButton").on("click",function(){
      var input=$("#lyricsSearch").val().trim();
      console.log("searching",input);
      $.post("https://smartlyricsapi.herokuapp.com/api/search/",{input: input},function(data){
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
      // add properties to global results object
      results[element.song_id] = {
      title: element.title,
      artist: element.artist,
      image: element.thumb,
      lyrics: element.lyrics
    };
      
      // generate HTML
      var thisSong = $("<div>").attr({"class":"song col-lg-12","data-song-id":element.id});
  
      thisSong.append(`<h2>${element.title} <span class="glyphicon glyphicon-align-justify lyricsButton" data-song-id=${element.song_id} data-toggle="modal" data-target="#lyricsModal" aria-hidden="true" data-lyrics-url=${element.lyrics}></span> <span class="glyphicon glyphicon-heart favoriteButton" data-song-id=${element.song_id} aria-hidden="true"></span> </h2>`);
  
      thisSong.append(`<p class="artist">${element.artist}</p>`);
      
      // add song div to display 
      $("#resultsList").append(thisSong); 
    }); // end add song results loop
   
    // attach click listener to lyrics button
    $(".lyricsButton").on("click",function(){
      
      //clear hidden modal window of any previous search results
      $("#lyricsModalTitle").html("Searching . . . ");
       $("#lyricsModalBody").html(" <i class=\"fa fa-spinner fa-pulse fa-3x fa-fw\"></i>");

      // what song is this?
      var thisSong = $(this).attr("data-song-id");
      
      fetchLyrics(thisSong,results);

  });  // end lyrics button click function
  
  // attach click listener to favorites button
  $(".favoriteButton").on("click",function(){
    var thisSong = $(this).attr("data-song-id");
    
    // build a post body:
    var body = {"title":results[thisSong].title,"artist":results[thisSong].artist,"song_id":thisSong,image:results[thisSong].image,lyrics:results[thisSong].lyrics};
    
    $.post("https://smartlyricsapi.herokuapp.com/api/favorite",body,function(data){
      console.log("Favorited",data);
    });
  });
} // end renderSearchResults function