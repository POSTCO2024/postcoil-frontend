import React from 'react';
import { Flex, Progress } from 'antd';
import styles from './Status.module.scss';

const Status: React.FC = () => {
  return (
    <div className={styles.statusContainer}>
      <Flex gap="small" wrap>
        <Progress type="circle" percent={100} />
        {/* <Progress type="circle" percent={100} status="exception" /> */}
      </Flex>
      <h4>양호</h4>
    </div>
  );
};

export default Status;
