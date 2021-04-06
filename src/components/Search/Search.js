import React from 'react';
import PropTypes from 'prop-types';
import './Search.css';

const Search = ({searchInput, setLastRequest, searchIsVisible}) => !searchIsVisible? null : <input
    className="search" type="text"
    placeholder="Type to search..."
    onKeyUp={(key) => {
        let result = '';
        if(key.target.value.length > 0) {
            result = key.target.value;
            setLastRequest(result);
            searchInput(result);
        }
    }
    }/>

Search.propTypes = {
    searchInput: PropTypes.func,
    setLastRequest: PropTypes.func,
    searchIsVisible: PropTypes.bool,
};

Search.defaultProps = {
    searchInput: () => {
    },
    setLastRequest: () => {
    },
    searchIsVisible: true
};


export default Search;