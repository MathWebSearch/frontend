import * as React from 'react';
import styles from './Header.module.css';

export interface Props {
  brandingTitle: string;
  brandingLink: string;
}
interface HeaderState{
    hover: boolean;
}

export class Header extends React.Component<Props, HeaderState> {
  constructor(props: Props) {
    super(props);
    this.state = {hover: false};
    this.renderMWSText = this.renderMWSText.bind(this);
    this.renderMWSTitle = this.renderMWSTitle.bind(this);
    this.hoverEnterHandler = this.hoverEnterHandler.bind(this);
    this.hoverLeaveHandler = this.hoverLeaveHandler.bind(this);
  }
  renderMWSTitle() {
    return <b className={styles.MWSTitle}> MathWebSearch</b>;
  }
  renderMWSText() {
    return (
      <div className={styles.MWSText}>
        The <a href={'http://search.mathweb.org'}>MathWebSearch</a> system (MWS)
        is a content-based search engine for mathematical formulae. It indexes
        MathML formulae, using a technique derived from automated theorem
        proving: Substitution Tree Indexing. MWS performs mathematical full-text
        search, combining key phrase search with unification-based formula
        search.
      </div>
    );
  }
  hoverEnterHandler() {
    this.setState({hover: true});
  }
  hoverLeaveHandler() {
    this.setState({hover: false});
  }

  render() {
    return (
      <div className={styles.header}>
        <a
          className={styles.corpus}
          href={this.props.brandingLink}
          target="_blank"
          rel="noopener noreferrer">
          {this.props.brandingTitle}
        </a>
        <div
          onMouseEnter={this.hoverEnterHandler}
          onMouseLeave={this.hoverLeaveHandler}>
          {this.state.hover ? this.renderMWSText() : this.renderMWSTitle()}
        </div>
        <br style={{clear: 'both'}} />
        <p style={{marginTop: '20px'}}>
          Enter a comma-separated list of key phrases into the top search bar
          and a set of formulae schemata (written in LaTeX with ?a, ?b, ... for
          query variables; they are marked in different colors in the formula
          preview). To add a numeric range insert{' '}
          <b>
            \range{'{lower}'}
            {'{high}'}
          </b>{' '}
          or
          <b>
            {' '}
            \relrange{'{base}'}
            {'{deviation}'}
          </b>{' '}
          (this adds a interval from [base - base*deviation%, base +
          base*deviation%]) in your search query. A formula schema in a query
          matches any formula in the MWS index that has an instance schema as a
          subformula. Query variables with the same name must be instantiated
          with the same formula, see the examples for inspiration.{' '}
          <a href={'https://github.com/KWARC/mws/wiki'}>... more</a>
        </p>
      </div>
    );
  }
}
