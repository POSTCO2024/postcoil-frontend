import { Progress, Result } from 'antd';
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
      {/* <h4>설비 이상</h4> */}
      <div className={styles.circle}>
        {status == 'RUNNING' ? (
          // <Progress type="circle" percent={100} />
          <Result status="success" className={styles.result} />
        ) : (
          // <Progress type="circle" percent={100} status="exception" />
          <Result status="error" className={styles.result} />
        )}
      </div>
      {status == 'RUNNING' ? <h4>설비 가동중</h4> : <h4>설비 이상</h4>}
    </div>
  );
};

export default Status;
