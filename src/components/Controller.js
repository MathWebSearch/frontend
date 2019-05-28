import React from 'react';
import {SearchBar} from './Searchbar';

class Controller extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            input_text:  ""
        };
        this.textinputHandler = this.textinputHandler.bind(this);
        this.sendQuery = this.sendQuery.bind(this);
    }

    textinputHandler(event){
        this.setState({input_text: event.target.value});
    }

    sendQuery(event){
        console.log(this.state.input_text);
        event.preventDefault();
    }

    render(){
        const {input_text} = this.state;
        return (<div>
                    <b> hier sollte eine serachBar stehen </b>
                    <SearchBar text={input_text}
                    submitHandler={this.sendQuery}
                    inputHandler={this.textinputHandler}/>
                </div>);
    }

}

export default Controller;
