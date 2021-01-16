import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PreviewItem from "../PreviewItem/PreviewItem";
import './PreviewList.css';

export default class PreviewList extends Component {

    static defaultProps = {
        movieList: []
    };

    static propTypes = {
        movieList: PropTypes.arrayOf(PropTypes.object)
    };

    render () {
        const {movieList} = this.props;
        const previews = movieList.map(({id, ...movieProps}) => <PreviewItem
            movieProps={movieProps}
                key={id}
            />)
        return (
            previews
        );
    }
}