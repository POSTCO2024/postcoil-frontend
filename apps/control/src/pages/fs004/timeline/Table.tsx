import { Table as CommonTable } from '@postcoil/ui';
import { DataType } from '@postcoil/ui/config/TableConfig';
import { ColumnDataType } from '@postcoil/ui/config/TableConfig';
import { useNavigate } from 'react-router-dom';

import styles from './Table.module.scss';

interface SchDataType extends DataType {
  key: string;
  no: string | number;
  scheduleId: string;
  createdDate: string;
  rollID: string;
  facility: string;
  startTime: string;
  endTime: string;
  rejectCount: number;
}

interface TableComponentProps {
  columns: ColumnDataType<SchDataType>[];
  data: SchDataType[];
}

export const Table = ({ columns, data }: TableComponentProps) => {
  const navigate = useNavigate();
  const handleRowClick = (record: { scheduleId: string }) => {
    console.log(record);
    navigate(`/roll/${record.scheduleId}`);
  };
  return (
    <div className={styles.tableContainer}>
      <CommonTable
        data={data}
        columns={columns}
        handleRowClick={handleRowClick}
      />
    </div>
  );
};

export default Table;
