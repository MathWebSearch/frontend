import React from 'react';
import PropTypes from 'prop-types';

export function SearchBar(props){
    const {text, submitHandler, inputHandler} = props;
    return ( <form onSubmit={submitHandler}>
                <input type="text" value={text}  onChange={inputHandler} />
                <input type="submit" value="Search"/>
              </form>
    );
}

SearchBar.propTypes = {
    text: PropTypes.string.isRequired,
    submitHandler: PropTypes.func.isRequired,
    inputHandler: PropTypes.func.isRequired
};
