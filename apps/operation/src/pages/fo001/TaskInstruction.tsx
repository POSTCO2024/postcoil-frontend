import { Tab } from '@postcoil/ui';
import { Table } from '@postcoil/ui';
import { Button } from '@postcoil/ui/components/atoms/Button';
import { useState } from 'react';

import ContentContainer from './result/ContentContainer';
import DraggableChart from './result/DraggableChart';
import DraggableChart2 from './result/DraggableChart2';
import FilterContainer from './result/FilterContainer';
import styles from './TaskInstruction.module.scss';

import { mockcolumns, mockdata } from '@/utils/fs002/MaterialTableUtils';
export const TaskInstruction = () => {
  const [isGraphVisible, setIsGraphVisible] = useState(true);

  const handleTabChange = () => {
    setIsGraphVisible((prevState) => !prevState);
  };
  return (
    <div className={styles.boardContainer}>
      <h1>작업지시</h1>
      <FilterContainer />
      <section className={styles.tab}>
        <Tab labels={['그래프', '리스트']} onChange={handleTabChange} />
      </section>
      <div className={styles.result}>
        {isGraphVisible ? (
          <div style={{ display: 'flex', height: '100%', width: '100%' }}>
            <div className={styles.charts}>
              <DraggableChart2 />
              <DraggableChart />
            </div>
            <div className={styles.btn_div}>
              <Button text={'보급요구'} style={true} />
              <div style={{ height: '20%' }} />
              <Button text={'reject'} style={true} />
              <div style={{ height: '20%' }} />
              <Button text={'긴급정지'} style={true} />
            </div>
          </div>
        ) : (
          <ContentContainer />
        )}
      </div>
      <div style={{ height: '40%', width: '80%' }}>
        <Table
          scroll={{ y: 200 }}
          columns={mockcolumns}
          data={mockdata}
          rowClassName={(record) =>
            record.changed ? `${styles.rowChanged}` : ''
          }
        />
      </div>
    </div>
  );
};

export default TaskInstruction;
