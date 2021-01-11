import React, {Component} from 'react';
import PreviewItem from "../preview-item/preview-item";
import './preview-list.css';

export default class PreviewList extends Component {
    render (props) {
            let previews = this.props.movieList.map(({ title, id, overview, poster_path }) => {
            return <PreviewItem
                title={title}
                key={id}
                overview={overview}
                poster_path={poster_path}
            />
        })
        return (
            previews
        );
    }
}