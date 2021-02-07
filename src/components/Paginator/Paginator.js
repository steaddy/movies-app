import React, { Component } from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import './Paginator.css';


export default class Paginator extends Component {
    static  some = 5;

    static defaultProps = {
        onPageChange: () => {},
        total: 0
    }

    static propTypes = {
        onPageChange: PropTypes.func,
        total: PropTypes.number
    };

    render(){
        const {onPageChange, total} = this.props;
        return(
            <Pagination size="small"
                        total={total} pageSize={20}
                        onChange={onPageChange}
                        pageSizeOptions={[]}
                        showSizeChanger={false}
            />
        );
    }
};