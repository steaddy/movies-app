import React, {Component} from 'react';
import './PreviewItem.css';

export default class PreviewItem extends Component{

    bannerUrlBase = 'https://image.tmdb.org/t/p/original';

    render() {
        const { posterPath, title, overview } = this.props;
        return (
        <section className='preview-item'>
            <div className="preview-item__banner"
            style={{'backgroundImage': `url(${this.bannerUrlBase}${posterPath}`}}
             />
            <div className="preview-item__main-content">
                <h5>{title}</h5>
                <time className='premier-date' dateTime='2020-3-5'>March 5, 2020</time>
                <div className="genre-list">
                    <div className='genre'>Action</div>
                    <div className='genre'>Drama</div>
                </div>
                <p>{overview}</p>
            </div>
            </section>
    )}
}