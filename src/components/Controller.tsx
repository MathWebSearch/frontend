import * as React from 'react';
import {SearchBar} from './Searchbar';
import {ltxclient, mwsclient} from '../Backend';
import {PreviewWindow} from './PreviewWindow';
import {ResultList} from './ResultList';
import ExampleButton from './ExampleButton';
import {ProgressBar} from './Progress';
import {IMWSClientResult, IFormulaHit} from '../Backend/client';

/** The Controller should be the heart heart of this.
 * It should keep track of all the state and provides all the needed functions
 * to the presentation components.
 * */

interface resultListContent {
  total: number;
  allEntries: IFormulaHit[];
}

interface State {
  input_text: string | null;
  input_formula: string | null;
  resultListContent: resultListContent | null;
  limitmin: number;
  answsize: number;
  progress: any;
  aggregation: string;
  [key: string]: any;
}

class Controller extends React.Component<any, State> {
  constructor(props: any) {
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
    this.updateResultList = this.updateResultList.bind(this);
    this.submitSearchHandler = this.submitSearchHandler.bind(this);
    this.getMoreResults = this.getMoreResults.bind(this);
    this.sendLatexmlQuery = this.sendLatexmlQuery.bind(this);
    this.updatePreviewWindow = this.updatePreviewWindow.bind(this);
    this.updateInputText = this.updateInputText.bind(this);
  }

  componentDidMount() {
    /** * This pulls out the query from the url */
    const location = window.location.toString().split('?query-math=');
    if (location.length < 2) {
      return;
    }
    const query = decodeURI(location.pop() || '');
    this.setState({input_text: query});
    this.textinputHandler(query);
  }

  textinputHandler(input_text: string) {
    if (input_text === this.state.input_text) {
      return;
    }

    // this should prevent that for every charakter that is typed in a
    // latexmlquery is send. Instead there only every second there is an
    // latexmlquery send, this hopfully reduceds the traffic
    this.setState({input_text: input_text});
    if (this.state.sendlatexmltimeout) {
      clearTimeout(this.state.sendlatexmltimeout);
    }
    this.setState({
      sendlatexmltimeout: setTimeout(() => {
        this.updateInputText(this.state.input_text || '');
        this.setState({sendlatexmltimeout: null});
      }, 1000),
    });
  }

  updateInputText(input_text: string) {
    // i'll guess it is not nessecary to send this whitespaces to ltx
    this.sendLatexmlQuery(input_text.replace(/\s*$/, ''));
    this.setState({input_text: input_text});
    window.history.pushState(null, '', `?query-math=${encodeURI(input_text)}`);
  }

  async sendLatexmlQuery(input_text: string) {
    if ('' === input_text) {
      // not really nessecary to send an empty string to latexml
      this.setState({
        input_text: '',
        input_formula: null,
      });
      return;
    }
    try {
      const input_formula = await ltxclient.fetchContent(input_text);
      this.setState({input_formula: input_formula});
    } catch (e) {
      console.error(e);
      this.setState({input_formula: ''});
    }
  }

  updateResultList() {
    if (!this.state.resultListContent) {
      return null;
    }
    const {total, allEntries} = this.state.resultListContent;
    return (
      <ResultList
        total={total}
        allEntries={allEntries}
        showMore={this.getMoreResults}
      />
    );
  }
  updatePreviewWindow() {
    const {input_formula} = this.state;
    if (null === input_formula) {
      return null;
    }
    return <PreviewWindow mathstring={input_formula} />;
  }

  getMoreResults() {
    if (!this.state.resultListContent) {
      return;
    }
    this.sendSearchQuery(this.state.limitmin);
  }

  submitSearchHandler(event: Event) {
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

  async sendSearchQuery(limitmin: number) {
    const {input_formula, answsize} = this.state;
    if (!input_formula) {
      return;
    }
    this.setState({progress: <ProgressBar percent={33} />});
    let result: IMWSClientResult;
    try {
      result = await mwsclient.fetchContent(input_formula, answsize, limitmin);
      const {allEntries} = this.state.resultListContent || {};
      this.setState({
        progress: <ProgressBar percent={100} />,
        limitmin: limitmin + answsize,
        resultListContent: {
          total: result.total,
          allEntries: [...(allEntries || []), ...result.entries],
        },
        last_took: result.took,
      });
    } catch (e) {
      console.log('sendSearchQuery failed');
    }
  }

  render() {
    const {input_text, progress, last_took} = this.state;
    return (
      <div className="Controller">
        {progress}
        {this.updatePreviewWindow()}
        <SearchBar
          text={input_text || ''}
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
