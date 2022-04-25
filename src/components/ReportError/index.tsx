import * as React from 'react';
import { REPORT_ISSUE_LINK } from 'src/config';
import styles from './ReportError.module.css';

export function ReportError(): JSX.Element {
  return (
    <span id={styles.forkongithub}>
      <a
        href={REPORT_ISSUE_LINK}
        target="_blank"
        rel="noopener noreferrer">
        Report Error on GitHub
      </a>
    </span>
  );
}
