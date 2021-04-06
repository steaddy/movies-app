import React, {Component} from 'react';
import {debounce} from 'lodash';
import  {Provider} from '../Context/index';
import Paginator from "../Paginator";
import MovieService from "../../services/movie-service";
import PreviewList from "../PreviewList";
import TabSelector from "../TabSelector";
import Search from "../Search";
import './App.css';

export default class App extends Component {
    movieService = new MovieService();

    searchInput = debounce((searchQuery) => {
        this.getMovies(searchQuery);
    }, 500);

    constructor(props) {
        super(props);

        this.state = {
            movieList: [],
            loading: true,
            error: false,
            searchIsVisible: true,
        };


    }

    componentDidMount() {
        // eslint-disable-next-line react/destructuring-assignment
        this.getMovies();



        this.getGenreMovieList();



        this.movieService.getRequestToken()
            .then(requestToken => {
                // this.movieService.authentication(requestToken);
                this.movieService.getGuestSessionId(requestToken)
                    .then(res => {
                        this.setState({
                            // eslint-disable-next-line react/no-unused-state
                            guestSessionId: res
                        })
                    });
            })
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
            .then((res) => {
                this.setState({searchIsVisible: true})
                this.onLoad(res);
            })
            .catch(this.onError)
    };

    onPageChange = (page) => {
        const {lastRequest} = this.state;
        this.getMovies(lastRequest, page)
    }

    setLastRequest = lastRequest => {
        this.setState({lastRequest});
    }

    getRatedMovies = () => {
        // eslint-disable-next-line react/destructuring-assignment
        this.movieService.getRatedMovies(this.state.guestSessionId)
            .then((res) => {
                this.setState({searchIsVisible: false})
                this.onLoad(res);
            })
            .catch(this.onError)
    };

    getGenreMovieList = async () => {
        this.movieService.getGenreMovieList()
            .then(res => {
                this.setState({genreMovieList: res.genres})
            })
    };

    rateMovie = (id, rate) => {
        const { guestSessionId } = this.state;
        this.movieService.rateMovie(guestSessionId, id, rate);
};

    render() {




        const {movieList, loading, error, total, page, searchIsVisible, genreMovieList } = this.state;
        return (
                <div className="main">
                    <Provider value={genreMovieList}>
                    <TabSelector getRatedMovies={this.getRatedMovies} getMovies={this.getMovies}/>
                    <Search searchIsVisible={searchIsVisible} searchInput={this.searchInput} setLastRequest={this.setLastRequest}/>
                    <PreviewList
                        movieList={movieList}
                        loading={loading}
                        error={error}
                        rateMovie={this.rateMovie}
                    />
                    <Paginator total={total} onPageChange={this.onPageChange} current={page}/>
                    </Provider>
                </div>
        )
    }
}