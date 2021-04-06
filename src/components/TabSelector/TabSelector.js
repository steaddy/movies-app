import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './TabSelector.css';

class TabSelector extends Component {

    static defaultProps = {
        getRatedMovies: () => {
        },
    };

    static
    propTypes = {
        getRatedMovies: PropTypes.func,
    };


    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                {active: true, id: 'tab_1', name: 'Search'},
                {active: false, id: 'tab_2', name: 'Rated'},
            ]
        }
    }

    tabToggler = (id) => {
        this.setState(({tabs}) => {
            const res = tabs.map(tab => {
                const newTab = {...tab};
                newTab.active = id === newTab.id;
                return newTab;
            });
            return {tabs: res};
        })
    };


    render() {
        const {tabs} = this.state;
        const {getRatedMovies, getMovies} = this.props;
        const tabsArr = tabs.map(({active, id, name}) =>
            // eslint-disable-next-line jsx-a11y/interactive-supports-focus
            <div role="button"
                 key={id}
                 className={`tab ${id} ${active ? 'activeTab' : ''}`}
                 onClick={() => {
                     this.tabToggler(id);
                     const func = id === 'tab_2' ? getRatedMovies : getMovies;
                     func();
                 }
                 }
                 onKeyDown={() => this.tabToggler(id)}>
                {name}
            </div>
        )

        return (
            <div className='tabContainer'>
                {tabsArr}
            </div>
        );
    }
}

export default TabSelector;