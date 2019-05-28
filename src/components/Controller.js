import React from 'react';
import {SearchBar} from './Searchbar';
import {latexmlQuery} from './Backend';
import {PreviewWindow, PreviewError} from './PreviewWindow';

class Controller extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            input_text: "",
            previewWindow: null,
            resultList: null
        };

        this.textinputHandler = this.textinputHandler.bind(this);
        this.sendQuery = this.sendQuery.bind(this);
    }

    textinputHandler(event){
        const input_text = event.target.value;
        console.log(input_text);
        if("" === input_text){
            this.setState({input_text: "", previewWindow: null});
            return;
        }
        latexmlQuery(input_text).then( json => {
            if(json['status_code'] === 0){
                this.setState({previewWindow: <PreviewWindow mathstring={json['result']}/>});
            }
            else{
                this.setState({previewWindow: <PreviewError />});
            }
        });
        this.setState({input_text: input_text});
    }

    sendQuery(event){
        console.log(this.state.input_text);
        event.preventDefault();
    }

    render(){
        const {input_text, previewWindow, resultList} = this.state;
        return (<div>
                    {previewWindow}
                    <SearchBar text={input_text}
                    submitHandler={this.sendQuery}
                    inputHandler={this.textinputHandler}/>
                    {resultList}
                </div>);
    }

}

export default Controller;
