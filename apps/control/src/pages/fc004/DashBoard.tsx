import React from 'react';

// 그래프
import Barchart from './chart/BarChart';
import BarChartV2 from './chart/BarChartV2';
import DonutChart from './chart/DonutChart';
import Piechart from './chart/PieChart';
import RowbarChart from './chart/RowbarChart';
import Status from './chart/Status';
import DoubleBarChart from './chart/DoubleBarChart';
import List from './chart/List';

import styles from './DashBoard.module.scss';

import {
  barchartOption,
  barchartV2Option,
  piechartOption,
  donutchartOption,
  rowbarchartOption,
  doublebarchartOption1,
  doublebarchartOption2,
} from '@/config/DashBoard/DashBoardConfig';

const DashBoard: React.FC = () => {
  return (
    <div className={styles.parentDiv}>
      <h1>공정별 작업대상재 분석</h1>
      <div className={styles.page}>
        <div className={styles.line1}>
          <div className={styles.smallCard}>
            <h6>현재 작업중</h6>
            <h3>50</h3>
          </div>
          <div className={styles.smallCard}>
            <h6>대기중</h6>
            <h3>13</h3>
          </div>
          <div className={styles.smallCard}>
            <h6>작업 완료</h6>
            <h3>13</h3>
          </div>
          <div className={styles.smallCard}>
            <h6>작업 시간</h6>
            <h3>00:15:03</h3>
          </div>
        </div>
        <div className={styles.line2}>
          <div className={styles.smallCard}>
            <BarChartV2 option={barchartV2Option} />
          </div>
          <div className={styles.smallCard}>
            <RowbarChart option={rowbarchartOption} />
          </div>
          <div className={styles.smallCard}>
            <Status />
          </div>
          <div className={styles.smallCard}>
            {/* <Barchart
              title="재료 정보"
              subtitle="(두께)"
              option={barchartOption}
            /> */}
            <List />
          </div>
        </div>
        <div className={styles.line2}>
          <div className={styles.smallCard}>
            <Piechart option={piechartOption} />
          </div>
          <div className={styles.smallCard}>
            {/* <Barchart
              title="재료 정보"
              subtitle="(폭)"
              option={barchartOption}
            /> */}
            <DoubleBarChart
              option1={doublebarchartOption1}
              option2={doublebarchartOption2}
            />
          </div>
          <div className={styles.smallCard}>
            <DonutChart title="품종" option={donutchartOption} />
          </div>
          <div className={styles.smallCard}>
            <DonutChart title="고객사" option={donutchartOption} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
