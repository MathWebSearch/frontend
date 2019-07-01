import React from 'react';
import {SearchBar} from './Searchbar';
import {convertQuery, searchQuery} from '../Backend';
import {PreviewWindow} from './PreviewWindow';
import {ResultList} from './ResultList';
import {MakeEntries} from '../util';
import ExampleButton from './ExampleButton';
import {ProgressBar} from './Progress';

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_text: '',
      input_formula: null,
      resultListContent: null,
      limitmin: 0,
      answsize: 30,
      progress: null,
    };

    this.textinputHandler = this.textinputHandler.bind(this);
    this.sendSearchQuery = this.sendSearchQuery.bind(this);
    this.toggleResultListEntry = this.toogleResultListEntry.bind(this);
    this.updateResultList = this.updateResultList.bind(this);
    this.submitSearchHandler = this.submitSearchHandler.bind(this);
    this.getMoreResults = this.getMoreResults.bind(this);
    this.sendLatexmlQuery = this.sendLatexmlQuery.bind(this);
    this.exampleInputHandler = this.exampleInputHandler.bind(this);
    this.updatePreviewWindow = this.updatePreviewWindow.bind(this);
    this.updateInputText = this.updateInputText.bind(this);
  }
  componentWillMount() {
    const location = window.location.toString().split('?query-math=');
    if (location.length < 2) {
      return;
    }
    const query = decodeURI(location.pop());
    this.setState({input_text: query});
    this.sendLatexmlQuery(query);
  }

  textinputHandler(event) {
    const input_text = event.target.value;
    if ('' === input_text) {
      this.setState({
        input_text: '',
        input_formula: null,
      });
      return;
    }
    this.updateInputText(input_text);
  }

  exampleInputHandler(example) {
    this.updateInputText(example);
  }

  updateInputText(input_text) {
    this.setState({input_text: input_text});
    this.sendLatexmlQuery(input_text);
    window.history.pushState(
      null,
      null,
      `?query-math=${encodeURI(input_text)}`,
    );
  }

  sendLatexmlQuery(input_text) {
    convertQuery(input_text).then(json => {
      if (json['status_code'] === 0) {
        this.setState({
          input_formula: json['result'],
        });
      } else {
        this.setState({
          input_formula: '',
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
  updatePreviewWindow() {
    const {input_formula} = this.state;
    if (null === input_formula) {
      return;
    }
    return <PreviewWindow mathstring={input_formula} />;
  }

  getMoreResults() {
    if (!this.state.resultListContent) {
      return;
    }
    this.sendSearchQuery(this.state.limitmin);
  }

  submitSearchHandler(event) {
    if ('' === this.state.input_formula) {
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
    const {input_formula, answsize} = this.state;
    if (!input_formula) {
      return;
    }
    this.setState({progress: <ProgressBar percent={33} />});

    searchQuery(limitmin, answsize, input_formula).then(json => {
      if (!json) {
        return;
      }
      // console.log(json);
      const hits = json['hits'] || [];
      const {allEntries} = this.state.resultListContent || {};
      var newContent = {...allEntries};
      MakeEntries(hits, newContent);
      this.setState({
        progress: <ProgressBar percent={100} />,
        limitmin: limitmin + answsize,
        resultListContent: {
          total: json['total'],
          allEntries: newContent,
        },
      });
    });
  }

  render() {
    const {input_text, progress} = this.state;
    return (
      <div className="Controller">
        {progress}
        {this.updatePreviewWindow()}
        <SearchBar
          text={input_text}
          submitHandler={this.submitSearchHandler}
          inputHandler={this.textinputHandler}
          exampleButton={
            <ExampleButton exampleClickHandler={this.exampleInputHandler} />
          }
        />
        <br style={{clear: 'both'}} />
        {this.updateResultList()}
      </div>
    );
  }
}

export default Controller;
