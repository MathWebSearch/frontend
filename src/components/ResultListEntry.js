import React from 'react';
import PropTypes from 'prop-types';
import '../css/ResultListEntry.css'

export function ResultListEntry(props){
    const {index, active, hit, clickHandler} = props;
    const local_id = hit.math_ids[0].url;

    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(hit.xhtml, "text/html");
    const metadata = htmlDoc.getElementsByTagName('metadata')[0];
    const title = metadata.getElementsByTagName('title')[0].innerHTML;
    const math_tags = htmlDoc.getElementsByTagName('m:math');
    //TODO maybe find a nicer solution for this
    var i = 0;
    while(i < math_tags.length){
        if(math_tags[i].getAttribute('local_id') === local_id){
            break;
        }
        i++;
    }
    // console.log(math_tags[i]);
    const url = math_tags[i].getAttribute('url');

    var inner;
    if(active){
        inner = (
            <p style={{backgroundColor : '#b4b4b4'}}>
            <div dangerouslySetInnerHTML={{__html: math_tags[i].innerHTML }}/>
            <a href={url} target="_blank" rel="noopener noreferrer"
                onClick={(ev) => {ev.stopPropagation();
                /*keeps it not collapsd even if clicked the link*/}}>
                link ins nlab
            </a></p>);
    }
    return (<div className="ResultListEntry" onClick={() => clickHandler(index)}>
                <b>{title}</b>
                {inner}
            </div>);
}

ResultListEntry.propTypes = {
    index: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    hit: PropTypes.object.isRequired,
    clickHandler: PropTypes.func.isRequired
};
