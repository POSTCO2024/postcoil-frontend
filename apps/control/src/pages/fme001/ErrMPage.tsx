import { Table } from '@postcoil/ui';

import styles from './ErrMPage.module.scss';
import Result from './Result';

import {
  facilitycolumn,
  facilityData,
  facilityErrColumn,
  facilityErrData,
  ManageColumn,
  infoErrColumn,
  infoErrData,
  managementData,
} from '@/config/management/ErrMConfig';

const ErrMPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <h1>에러기준 관리</h1>
      <div style={{ display: 'flex', width: '85%', height: '90%' }}>
        <div style={{ width: '25%', margin: 'auto' }}>
          <Table
            useCheckBox={false}
            columns={facilitycolumn}
            data={facilityData}
          />
        </div>
        <div className={styles.tables_frame}>
          <div style={{ display: 'flex' }}>
            <Table
              useCheckBox={false}
              columns={facilityErrColumn}
              data={facilityErrData}
              size={'small'}
              tableLayout={'fixed'}
            />
            <Result title="설비사양 에러" data={facilityErrData} />
          </div>
          <div style={{ display: 'flex' }}>
            <Table
              useCheckBox={false}
              columns={ManageColumn}
              data={managementData}
              size={'small'}
              tableLayout={'fixed'}
            />
            <Result title="관리재" data={managementData} />
          </div>
          <div style={{ display: 'flex' }}>
            <Table
              useCheckBox={false}
              columns={infoErrColumn}
              data={infoErrData}
              size={'small'}
            />
            <Result title="정보이상재" data={infoErrData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrMPage;
