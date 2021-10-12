declare module 'react-mathjax-preview' {
    import * as React from 'react';
    export default class MathJax extends React.Component<{math: string} & React.HTMLProps<"div">>{}
  }