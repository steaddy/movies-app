import React, {Component} from 'react';
import MovieService from "../../services/movie-service";
import PreviewList from "../PreviewList";
import './App.css';

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
        const { movieList } = this.state;
        return (
            <div className="main">
                <PreviewList movieList={movieList} />
            </div>
        )
    }
}