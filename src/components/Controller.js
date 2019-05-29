import React from 'react';
import {SearchBar} from './Searchbar';
import {latexmlQuery, mwsQuery} from './Backend';
import {PreviewWindow, PreviewError} from './PreviewWindow';
import {ResultList} from './ResultList';

class Controller extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            input_text: "",
            input_fromula: "",
            previewWindow: null,
            resultList: null,
            resultListContent: null
        };

        this.textinputHandler = this.textinputHandler.bind(this);
        this.sendSearchQuery = this.sendSearchQuery.bind(this);
        this.toggleResultListEntry = this.toogleResultListEntry.bind(this);
        this.updateResultList = this.updateResultList.bind(this);
        this.submitSearchHandler = this.submitSearchHandler.bind(this);
        this.getMoreResults = this.getMoreResults.bind(this);
    }

    textinputHandler(event){
        const input_text = event.target.value;
        if("" === input_text){
            this.setState({
                input_text: "",
                input_fromula: "",
                previewWindow: null}
            );
            return;
        }
        this.setState({input_text: input_text});
        latexmlQuery(input_text).then( json => {
            if(json['status_code'] === 0){
                this.setState({
                    previewWindow: <PreviewWindow mathstring={json['result']}/>,
                    input_fromula: json['result']
                });
            }
            else{
                this.setState({
                    previewWindow: <PreviewError />,
                    input_fromula: ""
                });
            }
        });
        // console.log(this.state.input_fromula);
    }

    toogleResultListEntry(index){
        var newContent = {...this.state.resultListContent};
        newContent.allEntries[index].active = !newContent.allEntries[index].active;
        this.setState({resultListContent: newContent});
        this.updateResultList();
    }

    updateResultList() {
        if(!this.state.resultListContent) {
            return;
        }
        const { total, allEntries } = this.state.resultListContent;
        this.setState({
            resultList: <ResultList
                            total={total}
                            clickHandler={this.toggleResultListEntry}
                            allEntries={allEntries}
                            showMore={this.getMoreResults} />
        });
    }

    getMoreResults(){
        if(!this.state.resultListContent){
            return;
        }
        const allEntries = this.state.resultListContent.allEntries;
        // console.log(allEntries.length);
        this.sendSearchQuery(allEntries.length, 30);
    }

    submitSearchHandler(event){
        if(this.state.input_fromula === ""){
            return;
        }
        this.setState({
            resultList: null,
            resultListContent: null
        });
        this.sendSearchQuery(0, 30);
        event.preventDefault();
    }

    sendSearchQuery(limitmin, answsize ) {
        mwsQuery(limitmin, answsize, this.state.input_fromula).then(json => {
            // console.log(json);
            const hits = json['hits'];
            const oldContent = this.state.resultListContent;
            const startindex =  oldContent ? oldContent.allEntries.length : 0;
            var allEntries = hits.map(hit => {
                return {index: startindex +hits.indexOf(hit),
                        active: false,
                        hit: hit };
                }
            );
            if(oldContent){
                allEntries = [...oldContent.allEntries, ...allEntries];
            }
            this.setState({
                resultListContent: {
                    total: json['total'],
                    allEntries:  allEntries
                }
                });
            this.updateResultList();
            });
    }

    render(){
        const {input_text, previewWindow, resultList} = this.state;
        return (<div>
                    {previewWindow}
                    <SearchBar text={input_text}
                    submitHandler={this.submitSearchHandler}
                    inputHandler={this.textinputHandler} />
                    {resultList}
                </div>);
    }

}

export default Controller;
