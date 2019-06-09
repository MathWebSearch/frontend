import React from 'react';
import {SearchBar} from './Searchbar';
import {latexmlQuery, mwsQuery} from './Backend';
import {PreviewWindow, PreviewError} from './PreviewWindow';
import {ResultList} from './ResultList';
import {MakeEntries} from './MakeMwsEntry';

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_text: '',
      input_fromula: '',
      previewWindow: null,
      resultListContent: null,
      limitmin: 0,
      answsize: 30,
    };

    this.textinputHandler = this.textinputHandler.bind(this);
    this.sendSearchQuery = this.sendSearchQuery.bind(this);
    this.toggleResultListEntry = this.toogleResultListEntry.bind(this);
    this.updateResultList = this.updateResultList.bind(this);
    this.submitSearchHandler = this.submitSearchHandler.bind(this);
    this.getMoreResults = this.getMoreResults.bind(this);
  }

  textinputHandler(event) {
    const input_text = event.target.value;
    if ('' === input_text) {
      this.setState({
        input_text: '',
        input_fromula: '',
        previewWindow: null,
      });
      return;
    }
    this.setState({input_text: input_text});
    latexmlQuery(input_text).then(json => {
      if (json['status_code'] === 0) {
        this.setState({
          previewWindow: <PreviewWindow mathstring={json['result']} />,
          input_fromula: json['result'],
        });
      } else {
        this.setState({
          previewWindow: <PreviewError />,
          input_fromula: '',
        });
      }
    });
  }

  toogleResultListEntry(key) {
    let newContent = this.state.resultListContent;
    newContent.allEntries[key].active = !newContent.allEntries[key].active;
    this.setState({resultListContent: newContent});
  }

  updateResultList() {
    if (!this.state.resultListContent) {
      return;
    }
    const {total, allEntries} = this.state.resultListContent;
    return (
      <ResultList
        total={total}
        clickHandler={this.toggleResultListEntry}
        allEntries={Object.keys(allEntries).map(k => allEntries[k])}
        showMore={this.getMoreResults}
      />
    );
  }

  getMoreResults() {
    if (!this.state.resultListContent) {
      return;
    }
    this.sendSearchQuery(this.state.limitmin);
  }

  submitSearchHandler(event) {
    if ('' === this.state.input_fromula) {
      return;
    }

    this.setState({
      limitmin: 0,
      resultListContent: null,
    });

    this.sendSearchQuery(0);
    event.preventDefault();
  }

  sendSearchQuery(limitmin) {
    const {input_fromula, answsize} = this.state;

    mwsQuery(limitmin, answsize, input_fromula).then(json => {
      // console.log(json);
      const hits = json['hits'];
      const {allEntries} = this.state.resultListContent || {};
      var newContent = {...allEntries};
      MakeEntries(hits, newContent);
      this.setState({
        limitmin: limitmin + answsize,
        resultListContent: {
          total: json['total'],
          allEntries: newContent,
        },
      });
    });
  }

  render() {
    const {input_text, previewWindow} = this.state;
    return (
      <div className="Controller">
        {previewWindow}
        <SearchBar
          text={input_text}
          submitHandler={this.submitSearchHandler}
          inputHandler={this.textinputHandler}
        />
        {this.updateResultList()}
      </div>
    );
  }
}

export default Controller;
