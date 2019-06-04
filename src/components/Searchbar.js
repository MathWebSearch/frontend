import React from 'react';
import PropTypes from 'prop-types';
import '../css/SearchBar.css';

export function SearchBar(props){
    const {text, submitHandler, inputHandler} = props;
    return (<div className="SearchBar">
                <form onSubmit={submitHandler}>
                    <input type="text" value={text}  onChange={inputHandler} />
                    <br/>
                    <input type="submit" value="Search"/>
                 </form>
            </div>
    );
}

SearchBar.propTypes = {
    text: PropTypes.string.isRequired,
    submitHandler: PropTypes.func.isRequired,
    inputHandler: PropTypes.func.isRequired
};
