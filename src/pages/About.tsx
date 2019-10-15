import * as React from 'react';

/**
 * About page with some more information
 * */

export function About(): JSX.Element {
  return (
    <>
      <div>
        The <a href={'http://search.mathweb.org'}>MathWebSearch</a> system (MWS)
        is a content-based search engine for mathematical formulae. It indexes
        MathML formulae, using a technique derived from automated theorem
        proving: Substitution Tree Indexing. MWS performs mathematical full-text
        search, combining key phrase search with unification-based formula
        search.
      </div>

      <p style={{marginTop: '20px'}}>
        Enter a key phrases with a set of formulae schemata into the search bar
        (written in LaTeX with ?a, ?b, ... for query variables; they are marked
        in different colors in the formula preview). To add a numeric range
        insert{' '}
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
        subformula. Query variables with the same name must be instantiated with
        the same formula, see the examples for inspiration.{' '}
        <a href={'https://github.com/KWARC/mws/wiki'}>... more</a>
      </p>
    </>
  );
}
