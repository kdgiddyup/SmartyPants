import React, { Component } from "react";
import '../../App.css'

class FavoritedSong extends Component {
 constructor() {
    super();
    this.state = {
      favorite: ""
      };
    }
    componentDidMount() {
        this.setState({
            favorite:this.props.favorite
        })
    }  
    render() {

        return(
            <div className="row">
                <div className="col-lg-10 col-lg-offset-1 col-md-10 col-offset-1 col-sm-12 col-xs-12">
                    <div className="panel">
                        <h3>{this.props.title} <span className="glyphicon glyphicon-align-justify lyricsButton" data-song-id={this.props.song_id} data-toggle="modal" data-target="#lyricsModal" aria-hidden="true" data-lyrics-url={this.props.lyrics}></span> <span className="glyphicon glyphicon-heart favoriteButton {this.state.favorite}" data-song-id={this.props.song_id} aria-hidden="true"></span> </h3>
                        <h4 className="artist">{this.props.artist}</h4>
                    </div>
                </div>
           </div> 
        )
    }
}

export default FavoritedSong