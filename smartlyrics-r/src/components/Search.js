import React, { Component } from 'react'
import ajax from "../utils/ajax"
import SearchResults from "./common/SearchResults"
import '../App.css'

class Search extends Component {
    constructor() {
    super();
    this.state = {
        songs: null
    };
    this.SetFavorite = this.SetFavorite.bind(this); 

    }
    handleSubmit = (event) => {
        event.preventDefault();
        
        // input is an object consisting of input string and user
        const input = {input:event.target.lyricsSearch.value.trim(),user: this.props.user};

        // search requires both input and the current user
        ajax.search(input,

        // error function:
        (response) => {
            // to do handle error
            console.log('error:', response)
        },
        //success function sets state
        (response) => {
            this.setState({
                songs:response
            })
        })
    }

    // method for saving a favorite song
    SetFavorite = (song_id) => {
        const songs = this.state.songs; 
        // loop through songs in state to find which matches this id
        for (var i=0;i<songs.length;i++){
            if (songs[i].song_id === song_id) {
                const thisSong = songs[i].song_id;
                // is this a favoriting or an unfavoriting?
                if (this.favorite == "favorite")
                    
                thisSong.favorite="favorite";
                const favPost = {
                    title:thisSong.title,
                    artist:thisSong.artist,
                    lyrics:thisSong.lyrics,
                    image:thisSong.image,
                    user:thisSong.user
                }
            }
        }
        ajax.favorite(this.favPost,
        //error function
        (response) => {
            console.log("Error favoriting:",response)
        },
        (response) => {
         // success function
         // update the favorite status
         this.thisSong.favorite="favorite";
         
         // build a new array to update state
         var updated = [];
         updated = () => { 
             return this.songs.map(song => (
                 updated.push(song)
             ))
         }
        this.setState({
             songs:updated
         })
        })
    }
    
    RenderResults = () => {
        return (
        (!this.state.songs) ? null : <SearchResults results={this.state.songs} SetFavorite={this.SetFavorite} /> 
        )
    }

   render() {

        return (
            <div className="row">
                <div id="searchInput" className="col-lg-12">
                     <form onSubmit={this.handleSubmit} id="signup">
                        <input className="input" id="lyricsSearch" name="lyricsSearch" placeholder="Enter lyrics, artists or song titles" type="text"/>
                     
                        <button className="btn btn-primary btn-block" id="lyricsSearchButton" type="submit">Submit</button>
                    </form>
                </div>
                <div id="searchResults" className="row">
                    <div className="col-lg-12" id="resultsList">
                        
                        {/* render results when there are some */}
                        {this.RenderResults()}

                    </div>  
                </div>
            </div>
        );

    }
}
export default Search