import React from 'react';

import styles from './ContentBoard.module.scss';
interface ContentBoardProps {
  Board?: React.ComponentType;
}

export function ContentBoard({ Board }: ContentBoardProps) {
  return (
    <div className={styles.greyBack}>
      <div className={styles.whiteBoard}>{Board && <Board />}</div>
    </div>
  );
}

export default ContentBoard;
