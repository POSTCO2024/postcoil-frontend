import { Table } from '@postcoil/ui';

import styles from './ExtMPage.module.scss';

import {
  columnData,
  columnsData,
  facilityData,
  standardData,
} from '@/config/management/ExtMConfig';

// // TODO: fetch data from API
// const extractions: DataType = {
//   공장코드: 100,
//   공정코드: 'CAL',
//   재료진행상태: '2',
//   재료진도: 'D',
// };

// // <에러기준>을 화면에 넣는다면 넣는 데이터 형식
// // const outlierCriteria: DataType = {
// //   width: '1',\
// //   thickness: '1',
// // };

// // TODO: fetch data 후 props로 넣기
// // interface PropsType {
// //   priorities: DataType;
// //   constraints: DataType;
// // }
// // { extractions, errorCriteria }: PropsType

const ExtMPage = () => {
  return (
    <div className={styles.page}>
      <h1>작업대상재 기준 관리</h1>
      <div className={styles.frame}>
        <div className={styles.facility}>
          <Table useCheckBox={false} columns={columnData} data={facilityData} />
          {/* <Result title="에러기준" data={outlierCriteria} /> */}
        </div>

        <div className={styles.facilityStandard}>
          <Table
            useCheckBox={false}
            columns={columnsData}
            data={standardData}
          />
        </div>
      </div>
    </div>
  );
};

export default ExtMPage;
