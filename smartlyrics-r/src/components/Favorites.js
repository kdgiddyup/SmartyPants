import React, { Component } from 'react'
import ajax from "../utils/ajax"
import "../App.css"
import FavoriteResults from "./common/FavoriteResults"
import FavoritesLoading from "./common/FavoritesLoading"

class Favorites extends Component {
    constructor() {
    super();
    this.state = {
        songs: null
        };
    }

    componentDidMount(){   
        // search requires current user
        ajax.favorites(this.props.user,
        // error function:
        (response) => {
            // to do: handle error
            console.log('error:', response)
        },
        //success function:
        (response) => {
            this.setState({
                songs:response
            });
        })
    }

    RenderResults = () => {
        return (
        (!this.state.songs) ? <FavoritesLoading/> : <FavoriteResults results={this.state.songs}/> 
        )
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12" id="favoritesList">
                    {/* render results when there are some */}
                    {this.RenderResults()}
                </div>
            </div>
        );
    }
}
export default Favorites