import React, {Component} from 'react';
import PreviewItem from "../PreviewItem/PreviewItem";
import './PreviewList.css';

export default class PreviewList extends Component {

    render () {
        const {movieList} = this.props;
            const previews = movieList.map(({ title, id, overview, posterPath }) => <PreviewItem
                title={title}
                key={id}
                overview={overview}
                posterPath={posterPath}
            />)
        return (
            previews
        );
    }
}