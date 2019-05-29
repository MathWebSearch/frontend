import React from 'react';
import PropTypes from 'prop-types';

export function ResultListEntry(props){
    const {index, active, hit, clickHandler} = props;
    const url = hit.math_ids[0].url;

    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(hit.xhtml, "text/html");
    const id = htmlDoc.getElementsByTagName('id')[0].innerHTML;

    var inner;
    if(active){
        inner = (<p><a href={url} target="_blank" rel="noopener noreferrer"
                onClick={(ev) => {ev.stopPropagation();
                /*keeps it not collapsd even if clicked the link*/}}>
                link ins nlab
            </a></p>);
    }
    return (<div onClick={() => clickHandler(index)} >
                <b>{id}</b>
                {inner}
            </div>);
}

ResultListEntry.propTypes = {
    index: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    hit: PropTypes.object.isRequired,
    clickHandler: PropTypes.func.isRequired
};
