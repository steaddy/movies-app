import React, {Component} from 'react';
import MovieService from "../../services/movie-service";
import PreviewList from "../preview-list";
import './app.css';

export default class App extends Component {
    movieService = new MovieService();
    constructor(props) {
        super(props);
        this.state = {
            movieList: []
        };


        this.getMovies();
    }


    getMovies = () => {
        this.movieService.getMovies()
            .then(movieList => {
                this.setState({movieList});
            })
    };

    render() {
        return (
            <div className="main">
                <PreviewList movieList={this.state.movieList} />
            </div>
        )
    }
}