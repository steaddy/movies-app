import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './PreviewItem.css';
import noImage from "../../img/no_image.png";

export default class PreviewItem extends Component{

    bannerUrlBase = 'https://image.tmdb.org/t/p/original';

    static defaultProps = {
        movieProps: {},
    };

    static propTypes = {
        movieProps: PropTypes.shape({
            posterPath: PropTypes.string,
            title: PropTypes.string,
            overview: PropTypes.string,
            releaseDate: PropTypes.string,
        })
    };




    render() {
        const {movieProps} = this.props;
        const { posterPath, title, overview, releaseDate } = movieProps;

        return (
        <section className='preview-item'>
            <div className="preview-item__banner">

                {posterPath ? <img src={this.bannerUrlBase + posterPath} alt="Banner"/>
                : <img className="no-image" src={noImage} alt="Banner"/>}

                </div>
            <div className="preview-item__main-content">
                <h5>{title}</h5>
                <time className='premier-date' dateTime={releaseDate}>{releaseDate}</time>
                <div className="genre-list">
                    <div className='genre'>Action</div>
                    <div className='genre'>Drama</div>
                </div>
                <p>{overview}</p>
            </div>
            </section>
    )}
}

