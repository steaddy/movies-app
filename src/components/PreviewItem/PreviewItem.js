import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
import {Consumer} from '../Context/index';
import './PreviewItem.css';
import noImage from "../../img/no_image.png";

export default class PreviewItem extends Component{

    bannerUrlBase = 'https://image.tmdb.org/t/p/original';

    static defaultProps = {
        movieProps: {},
        rateMovie: () => {},
    };

    static propTypes = {
        movieProps: PropTypes.shape({
            posterPath: PropTypes.string,
            title: PropTypes.string,
            overview: PropTypes.string,
            releaseDate: PropTypes.string,
            rating: PropTypes.number,
            movieId: PropTypes.number,
            genreIds: PropTypes.arrayOf(PropTypes.object),
        }),
        rateMovie: PropTypes.func,
    };

    getRatingColor = rating => {
        if(rating <= 3) return '#E90000';
        if(rating <= 5) return '#E97E00';
        if(rating <= 7) return '#E9D100';
        return '#66E900';
    };

  /*  getMoviesGenre = (genreMovieList, genreIds) => {

    }; */




    render() {
        const {movieProps, rateMovie} = this.props;
        const { posterPath, title, overview, releaseDate, rating = 0, movieId } = movieProps;
        const ratingColor = this.getRatingColor(rating);

        return (

            <Consumer>{()=> <section className='preview-item'>
                <div className="preview-item__banner">

                    {posterPath ? <img src={this.bannerUrlBase + posterPath} alt="Banner"/>
                        : <img className="no-image" src={noImage} alt="Banner"/>}

                </div>
                <div className="preview-item__main-content">


                    <div className="ratingIndicator" style={{borderColor: ratingColor}}>{rating}</div>


                    <h5>{title}</h5>
                    <time className='premier-date' dateTime={releaseDate}>{releaseDate}</time>
                    <div className="genre-list">


                        <div className='genre'>Action</div>
                        <div className='genre'>Drama</div>



                    </div>
                    <p>{overview}</p>
                    <Rate count={10} allowHalf defaultValue={0} value={rating} onChange={(num)=> {
                        rateMovie(movieId, num);
                    }}/>
                </div>
            </section>}</Consumer>

    )}
}

