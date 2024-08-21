import { Progress } from 'antd';
import React from 'react';

import styles from './Status.module.scss';

const Status: React.FC = () => {
  return (
    <div className={styles.statusContainer}>
      <h4>설비 이상</h4>
      <div className={styles.circle}>
        <Progress type="circle" percent={100} />
        {/* <Progress type="circle" percent={100} status="exception" /> */}
      </div>
      <h4>양호</h4>
    </div>
  );
};

export default Status;
