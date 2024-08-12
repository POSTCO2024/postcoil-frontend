import React from 'react';
import { Tab, Table, Button } from '@postcoil/ui';
import { TopBar } from '../TopBar/TopBar';

export const Board: React.FC<{}> = () => {
  return (
    <div className="boardContainer">
      <h3>공정 별 작업대상재 관리</h3>
      <TopBar />
      <Table />
    </div>
  );
};

// export default Board;
