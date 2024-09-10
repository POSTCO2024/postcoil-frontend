import { Table as AntTable, ConfigProvider, TablePaginationConfig } from 'antd';
import React from 'react';

import styles from './Table.module.scss';
import { DataType, ColumnDataType } from '../../config/TableConfig';
import { createColumns } from '../../utils/TableUtils';

// ** INFO **
// Data 예시
// const data: DataType[] = [
//   {
//     key: '1',
//     no: '1',
//     id: 'A001',
//     length: 60,
//     width: 70,
//   },..]

// ColumnData 예시
// const column : ColumnDataType<DataType>[] = [
//   {
//     title: '두께',
//     dataIndex: 'length',
//     sortable: {             // 내가 적용시킬 sorting 함수 넣기! true
//       compare: (a, b) => a.length - b.length,
//       multiple: 2,
//     },
//   },
//   {
//     title: '폭',
//     dataIndex: 'width',
//     sortable: false,
//     fix: true,              // 왼쪽에 고정, 오른쪽 고정이고 싶으면 'right'로 넣기
//   },
// ];

interface TableComponentProps<T extends DataType> {
  pagination?: false | TablePaginationConfig;
  useCheckBox?: boolean;
  columns: ColumnDataType<T>[];
  data: T[];
  handleRowClick?: (record?: any, rowIndex?: number) => void; // Row click event handler
  handleRowsClick?: (selectedRows: any[]) => void; // useCheckBox event handler, 데이터를 가지고 다룰 정보 처리 함수
  scroll?: { x?: number | string; y?: number | string }; // 스크롤 설정
  size?: string;
  tableLayout?: string | undefined;
  className?: string;
  rowClassName?: (record: any) => string;
  rowKey?: string | ((record: T) => string);
  components?: any;
  setSelectedMaterials?: any;
}

export const Table = <T extends DataType>({
  pagination = false,
  useCheckBox = false,
  columns,
  data,
  handleRowClick,
  handleRowsClick,
  scroll,
  size,
  tableLayout,
  className,
  rowClassName,
  rowKey,
  components,
  setSelectedMaterials,
}: TableComponentProps<T>) => {
  const processedColumns = [...createColumns(columns)];
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection = {
    onChange: (newSelectedRowKeys: React.Key[], selectedRows: T[]) => {
      setSelectedMaterials(newSelectedRowKeys);
      if (handleRowsClick) {
        handleRowsClick(selectedRows);
      }
    },
  };

  return (
    <div className={styles.tableContainer}>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              // headerBg: '#eff4ff',
              // rowSelectedBg: '#eff4ff',
            },
          },
        }}>
        <AntTable
          pagination={pagination || false}
          rowSelection={useCheckBox ? rowSelection : undefined}
          className={`${styles.antTable} ${className}`}
          columns={processedColumns}
          dataSource={data}
          onRow={
            handleRowClick
              ? (record, rowIndex) => ({
                  onClick: () => handleRowClick(record, rowIndex),
                })
              : undefined
          }
          scroll={scroll ? scroll : undefined}
          size={size ? 'small' : 'large'}
          tableLayout={tableLayout ? 'fixed' : undefined}
          rowClassName={rowClassName}
          rowKey={rowKey}
          components={components}
        />
      </ConfigProvider>
    </div>
  );
};

export default Table;
