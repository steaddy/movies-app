import React, {Component} from 'react';
import PreviewItem from "../PreviewItem/PreviewItem";
import './PreviewList.css';

export default class PreviewList extends Component {

    render () {
        const {movieList} = this.props;
            const previews = movieList.map(({id, ...movieList}) => <PreviewItem
                movieList={movieList}
                key={id}
            />)
        return (
            previews
        );
    }
}