import * as React from 'react';
import styles from './ReportError.module.css';

export function ReportError(): JSX.Element {
  return (
    <span id={styles.forkongithub}>
      <a
        href="https://github.com/MathWebSearch/frontend/issues"
        target="_blank"
        rel="noopener noreferrer">
        Report Error on GitHub
      </a>
    </span>
  );
}
