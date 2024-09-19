import { Table } from '@postcoil/ui';

import styles from './ContentContainer.module.scss';

import { MaterialDTO } from '@/config/scheduling/DTO';
import {
  mockcolumns,
  transformedData,
} from '@/utils/scheduling/MaterialTableUtils';

interface PropsType {
  data: MaterialDTO[];
  setSelectedRows: React.Dispatch<React.SetStateAction<MaterialDTO[]>>;
}

const ContentContainer = ({ data, setSelectedRows }: PropsType) => {
  // handleRowsClick 함수: 선택된 행 데이터를 상태로 저장하고, 콘솔에 출력
  const handleRowsClick = (selectedRows: MaterialDTO[]) => {
    setSelectedRows(selectedRows); // 선택된 데이터를 상태에 저장
    console.log('Selected Rows:', selectedRows); // 선택된 행을 콘솔에 출력
  };

  return (
    <div className={styles.contentContainer}>
      <section className={styles.result}>
        <div className={styles.table}>
          {/* TODO: common-ui의 Table checkbox fix!!  */}
          <Table
            useCheckBox={true}
            columns={mockcolumns}
            data={transformedData(data)}
            handleRowsClick={handleRowsClick}
          />
        </div>
      </section>
    </div>
  );
};

export default ContentContainer;
