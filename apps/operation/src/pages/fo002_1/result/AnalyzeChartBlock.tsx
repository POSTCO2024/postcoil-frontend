import React from 'react';

import styles from './AnalyzeChartBlock.module.scss';

interface PropsType {
  title: string;
  content: React.ReactNode | string;
}

const AnalyzeChartBlock = ({ title, content }: PropsType) => {
  return (
    <div className={styles.item}>
      <div className={styles.itemStyle}>
        <div className={styles.itemTitle}>{title}</div>
        <div className={styles.itemContent}>{content}</div>
      </div>
    </div>
  );
};

export default AnalyzeChartBlock;
