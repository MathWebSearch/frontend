import React from 'react';
import PropTypes from 'prop-types';
import '../css/PreviewWindow.css';

export function PreviewError(){
    return (<div><b>Error with Math Prieview </b></div>);
}

export function PreviewWindow(props){
    const {mathstring} = props;
    if("" === mathstring){
        return;
    }
    const pmml = mathstring.replace(/<semantics[\s\S]*>[\s\S]*<annotation/, 
                    '<semantics><annotation'); 
    const markup = {__html: pmml};
    return <div className="PreviewWindow" dangerouslySetInnerHTML={markup}/>;
}

PreviewWindow.propTypes = {
    mathstring : PropTypes.string.isRequired
};
