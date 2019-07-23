import React from 'react';
import './css/MWS_Header.css';

export function MwsHeader() {
  return (
    <div className="MWSTitle">
      <h1> MathWebSearch</h1>
      <div>
        <p style={{textAlign: 'justify', marginBottom: '30px'}}>
          The <a href={'http://search.mathweb.org'}>MathWebSearch</a>
          system (MWS) is a content-based search engine for mathematical
          formulae. It indexes MathML formulae, using a technique derived from
          automated theorem proving: Substitution Tree Indexing. MWS performs
          mathematical full-text search, combining key phrase search with
          unification-based formula search.
        </p>
      </div>
      <p style={{textAlign: 'justify', marginTop: '20px'}}>
        Enter a comma-separated list of key phrases into the top search bar and
        a set of formulae schemata (written in LaTeX with ?a, ?b, ... for query
        variables; they are marked in red in the formula preview). To add a
        numeric range add \range{"{lower}"}{"{high}"} or \relrange{"{base}"}{"{deviation}"}
        (this adds a interval from [base - base*deviation%, base + base*deviation%]).
        A formula schema in a query matches any formula in the
        MWS index that has an instance schema as a subformula. Query variables
        with the same name must be instantiated with the same formula, see the
        examples for inspiration.
        <a href={'https://github.com/KWARC/mws/wiki'}>... more</a>
      </p>
    </div>
  );
}
