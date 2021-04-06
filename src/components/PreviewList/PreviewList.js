import React, {Component} from 'react';
import { Spin, Alert } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import PreviewItem from "../PreviewItem/PreviewItem";
import './PreviewList.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class PreviewList extends Component {

    static defaultProps = {
        movieList: [],
        loading: true,
        error: false,

        rateMovie: () => {},
    };

    static propTypes = {
        movieList: PropTypes.arrayOf(PropTypes.object),
        loading: PropTypes.bool,
        error: PropTypes.bool,
        rateMovie: PropTypes.func,
    };

    render () {
        const {movieList, loading, error, rateMovie} = this.props;
        const previews = movieList.map(({id, ...movieProps}) => <PreviewItem
            movieProps={movieProps}
            rateMovie={rateMovie}
                key={id}
        />);
        const notFound = !previews.length && !loading ? <p className="nothing-found">Nothing found, try another query.</p> : null;
        const spin = loading && !error ? <Spin size="large"/> : null;
        const alert = error ? <Alert type="error" message="An error has occurred." showIcon /> : null;

        return (
            <>
                {spin}
            <div className="preview-list">
                {notFound}
                {previews}
                {alert}
            </div>
                </>
        )
    }
}