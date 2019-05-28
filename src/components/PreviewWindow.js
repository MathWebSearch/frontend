import React from 'react';
import PropTypes from 'prop-types';

export function PreviewError(){
    return (<div><b>Error with Math Prieview </b></div>);
}

export function PreviewWindow(props){
    const {mathstring} = props;
    const pmml = mathstring.replace(/<semantics[\s\S]*>[\s\S]*<annotation/, 
                    '<semantics><annotation'); 
    const markup = {__html: pmml};
    return <div dangerouslySetInnerHTML={markup}/>;
}

PreviewWindow.propTypes = {
    mathstring : PropTypes.string.isRequired
};
