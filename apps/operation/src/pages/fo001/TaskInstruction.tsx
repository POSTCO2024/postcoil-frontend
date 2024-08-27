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
          <div style={{ height: '100%' }}>
            <div style={{ display: 'flex', width: '100%', height: '60%' }}>
              <div className={styles.charts}>
                <DraggableChart2 />
                <DraggableChart />
              </div>
              <div className={styles.btn_div}>
                <Button text={'보급요구'} style={true} />
                <div style={{ height: '12%' }} />
                <Button text={'reject'} style={true} />
                <div style={{ height: '12%' }} />
                <Button text={'긴급정지'} style={true} />
              </div>
            </div>
            <div style={{ height: '40%' }}>ㅠㅛ</div>
          </div>
        ) : (
          <ContentContainer />
        )}
      </div>
    </div>
  );
};

export default TaskInstruction;
