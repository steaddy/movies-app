import React, {Component} from 'react';
import './preview-item.css';

export default class PreviewItem extends Component{
    constructor(props) {
        super(props);

    }
    _bannerUrlBase = 'https://image.tmdb.org/t/p/original';

    render() {
        let { poster_path, title, overview } = this.props;
        return (
        <section className='preview-item'>
            <div className="preview-item__banner"
            style={{'background-image': `url(${this._bannerUrlBase}${poster_path}`}}
            ></div>
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