import React from 'react';
import { ResultListEntry } from './ResultListEntry';
import PropTypes from 'prop-types';
import '../css/ResultList.css'

export function ResultList(props) {
    const {total, clickHandler, allEntries, showMore} = props;
    const curlength = allEntries.map(e => e['formulas'].length).reduce((acc, cur) => acc + cur, 0);
    return (
    <div className="ResultList">
        <div>
        Showing {curlength} of <b>{total}</b> results in {allEntries.length} pages
        </div>
        <div>
            {allEntries.map(entry => {
                const {key, active, title, formulas} = entry;
                return (<ResultListEntry key={key}
                            id={key}
                            active={active}
                            title={title}
                            formulas={formulas}
                            clickHandler={clickHandler}/>);
            })}
        </div>
        <div>
        {curlength < total ? <button onClick={showMore}>Show More</button> : null}
        </div>
    </div>);
}

ResultList.propTypes = {
    total: PropTypes.number.isRequired,
    clickHandler: PropTypes.func.isRequired,
    allEntries: PropTypes.array.isRequired,
    showMore: PropTypes.func.isRequired,
};
