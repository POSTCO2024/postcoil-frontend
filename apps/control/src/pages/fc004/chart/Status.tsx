import { Progress } from 'antd';
import React from 'react';

import styles from './Status.module.scss';

interface StatusProps {
  status: string;
}

const Status: React.FC<StatusProps> = ({ status }) => {
  if (status == 'RUNNING') {
  }
  return (
    <div className={styles.statusContainer}>
      <h4>설비 이상</h4>
      <div className={styles.circle}>
        {status == 'RUNNING' ? (
          <Progress type="circle" percent={100} />
        ) : (
          <Progress type="circle" percent={100} status="exception" />
        )}
      </div>
      {status == 'RUNNING' ? <h4>양호</h4> : <h4>이상</h4>}
    </div>
  );
};

export default Status;
