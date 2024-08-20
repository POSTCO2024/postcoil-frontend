import React from 'react';
import {
  barchartOption,
  barchartV2Option,
  piechartOption,
  donutcahrtOption,
  rowbarchartOption,
} from '../../../config/DashBoard/DashBoardConfig';
import styles from './DashBoard.module.scss';

// 그래프
import Barchart from './chart/BarChart';
import Piechart from './chart/PieChart';
import DonutChart from './chart/DonutChart';
import RowbarChart from './chart/RowbarChart';
import Status from './chart/Status';
import BarChartV2 from './chart/BarChartV2';

const DashBoard: React.FC = () => {
  return (
    <div className={styles.parentDiv}>
      awdawdwaawdwda
      <div className={styles.line1}>
        <div className={styles.small_card}>
          <h6>현재 작업중</h6>
          <h3>50</h3>
        </div>
        <div className={styles.small_card}>
          <h6>대기중</h6>
          <h3>13</h3>
        </div>
        <div className={styles.small_card}>
          <h6>작업 완료</h6>
          <h3>13</h3>
        </div>
        <div className={styles.small_card}>
          <h6>작업 시간</h6>
          <h3>00:15:03</h3>
        </div>
      </div>
      <div className={styles.line2}>
        <div className={styles.small_card}>
          <Piechart option={piechartOption} />
        </div>
        <div className={styles.small_card}>
          <BarChartV2 option={barchartV2Option} />
        </div>
        <div className={styles.small_card}>
          <RowbarChart option={rowbarchartOption} />
        </div>
        <div className={styles.small_card}>
          <h4>설비 이상</h4>
          <Status />
        </div>
      </div>
      <div className={styles.line2}>
        <div className={styles.small_card}>
          <DonutChart option={donutcahrtOption} />
        </div>
        <div className={styles.small_card}>
          <DonutChart option={donutcahrtOption} />
        </div>
        <div className={styles.small_card}>
          <Barchart option={barchartOption} />
        </div>
        <div className={styles.small_card}>
          <Barchart option={barchartOption} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
