import React from 'react';
import {SearchBar} from './Searchbar';
import {convertQuery, searchQuery} from '../Backend';
import {PreviewWindow} from './PreviewWindow';
import {ResultList} from './ResultList';
import {MakeEntries} from '../util';
import ExampleButton from './ExampleButton';
import {ProgressBar} from './Progress';

/** The Controller should be the heart heart of this.
 * It should keep track of all the state and provides all the needed functions
 * to the presentation components.
 * */

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
      aggregation: 'segment',
    };

    this.textinputHandler = this.textinputHandler.bind(this);
    this.sendSearchQuery = this.sendSearchQuery.bind(this);
    this.toggleResultListEntry = this.toogleResultListEntry.bind(this);
    this.updateResultList = this.updateResultList.bind(this);
    this.submitSearchHandler = this.submitSearchHandler.bind(this);
    this.getMoreResults = this.getMoreResults.bind(this);
    this.sendLatexmlQuery = this.sendLatexmlQuery.bind(this);
    this.updatePreviewWindow = this.updatePreviewWindow.bind(this);
    this.updateInputText = this.updateInputText.bind(this);
    this.aggrHandler = this.aggrHandler.bind(this);
  }

  componentDidMount() {
    /** * This pulls out the query from the url */
    const location = window.location.toString().split('?query-math=');
    if (location.length < 2) {
      return;
    }
    const query = decodeURI(location.pop());
    this.setState({input_text: query});
    this.textinputHandler(query);
  }

  aggrHandler() {
    // TODO in long term sight this is not that clever
    // because we send a new request, i'll guess it would be better to change
    // this in just reodering the results we already have but this needs a
    // lil more restructuring
    const {aggregation} = this.state;
    let newAggregation = 'segment';
    if (aggregation === 'segment') {
      newAggregation = '';
    }
    this.setState({
      resultListContent: null,
      aggregation: newAggregation,
      limitmin: 0,
    });
    this.sendSearchQuery(0);
  }

  textinputHandler(input_text) {
    if (input_text === this.state.input_text) {
      return;
    }

    // this should prevent that for every charakter that is typed in a
    // latexmlquery is send. Instead there only every second there is an
    // latexmlquery send, this hopfully reduceds the traffic
    this.setState({input_text: input_text});
    if (!this.state.sendlatexmltimeout) {
      this.setState({
        sendlatexmltimeout: setTimeout(() => {
          this.updateInputText(this.state.input_text);
          this.setState({sendlatexmltimeout: null});
        }, 1000),
      });
    }
  }

  updateInputText(input_text) {
    // i'll guess it is not nessecary to send this whitespaces to ltx
    this.sendLatexmlQuery(input_text.replace(/\s*$/, ''));
    this.setState({input_text: input_text});
    window.history.pushState(
      null,
      null,
      `?query-math=${encodeURI(input_text)}`,
    );
  }

  async sendLatexmlQuery(input_text) {
    if ('' === input_text) {
      // not really nessecary to send an empty string to latexml
      this.setState({
        input_text: '',
        input_formula: null,
      });
      return;
    }
    let json;
    try {
      json = await convertQuery(input_text);
    } catch (e) {}

    if (json === undefined) {
      json = {status_code: 1};
    }

    // console.log(json);
    if (json['status_code'] === 0) {
      this.setState({
        input_formula: json['result'],
      });
    } else {
      this.setState({
        input_formula: '',
      });
    }
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
        aggrHandler={this.aggrHandler}
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

  async sendSearchQuery(limitmin) {
    const {input_formula, answsize} = this.state;
    if (!input_formula) {
      return;
    }
    this.setState({progress: <ProgressBar percent={33} />});
    let json;
    try {
      json = await searchQuery(limitmin, answsize, input_formula);
      this.setState({progress: <ProgressBar percent={66} />});
    } catch (e) {}

    if (!json) {
      return;
    }
    const hits = json['hits'] || [];
    const qvars = json['qvars'] || [];
    // console.log(hits);
    // console.log(qvars);
    const {allEntries} = this.state.resultListContent || {};
    var newContent = {...allEntries};
    MakeEntries(hits, newContent, qvars, this.state.aggregation);
    this.setState({
      progress: <ProgressBar percent={100} />,
      limitmin: limitmin + answsize,
      resultListContent: {
        total: json['total'],
        allEntries: newContent,
      },
      last_took: json.took,
    });
  }

  render() {
    const {input_text, progress, last_took} = this.state;
    return (
      <div className="Controller">
        {progress}
        {this.updatePreviewWindow()}
        <SearchBar
          text={input_text}
          submitHandler={this.submitSearchHandler}
          inputHandler={this.textinputHandler}>
          <ExampleButton
            exampleInputHandler={this.updateInputText}
            exampleSubmitHandler={this.submitSearchHandler}
          />
        </SearchBar>

        <br style={{clear: 'both'}} />
        {last_took ? (
          <div className="Stats">{`Last Query took ${(last_took / 10e9).toFixed(
            4,
          )} seconds`}</div>
        ) : null}
        {this.updateResultList()}
      </div>
    );
  }
}

export default Controller;
