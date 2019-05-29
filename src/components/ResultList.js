import React from 'react';
import { ResultListEntry } from './ResultListEntry';

export function ResultList(props){
    const {total, clickHandler, allEntries, showMore} = props;
    const curlength = allEntries.length;
    return (
    <div>Showing {1} to {curlength} of <b>{total}</b> Results
        <div>
            {allEntries.map(entry => {
                const {index, active, hit} = entry;
                return (<ResultListEntry key={index}
                            index={index}
                            active={active}
                            hit={hit}
                            clickHandler={clickHandler}/>);
            })}
        </div>
        {curlength < total ? <button onClick={showMore}>Show More</button>: null}
    </div>);

}
