import React, {Component} from 'react';
import {debounce} from 'lodash';
import Paginator from "../Paginator";
import MovieService from "../../services/movie-service";
import PreviewList from "../PreviewList";
import Search from "../Search";
import './App.css';

export default class App extends Component {
    movieService = new MovieService();

    searchInput = debounce((searchQuery ) => {
        this.getMovies(searchQuery);
    }, 500);

    constructor(props) {
        super(props);
        
        this.state = {
            movieList: [],
            loading: true,
            error: false,
        };

        
        // eslint-disable-next-line react/destructuring-assignment
        this.getMovies();
    }

    onLoad = (res) => {
        this.setState({
            movieList: res.movieList,
            loading: false,
            total: res.total
        });
    }

    onError = (err) => {
        this.setState({error: true});
        console.log(err);
    }
    
    getMovies = (searchQuery, page = 1) => {
        this.movieService.getMovies(searchQuery, page)
            .then(this.onLoad)
            .catch(this.onError)
    };

    onPageChange = (page) => {
        const { lastRequest } = this.state;
        this.getMovies(lastRequest, page)
    }

    setLastRequest = lastRequest => {
        this.setState({lastRequest});
    }



    render() {
        const { movieList, loading, error, total, page } = this.state;
        return (
            <div className="main">
                <Search searchInput={this.searchInput} setLastRequest={this.setLastRequest}/>
                <PreviewList
                    movieList={movieList}
                    loading={loading}
                    error={error}
                />
                <Paginator total={total} onPageChange={this.onPageChange} current={page}/>
            </div>
        )
    }
}