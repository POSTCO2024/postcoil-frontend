import { Table as AntTable, ConfigProvider, TablePaginationConfig } from 'antd';
import React from 'react';

import styles from './Table.module.scss';
import { createColumns } from '../../utils/TableUtils';

// info
// Data 예시
//
// const data: DataType[] = [
//   {
//     key: '1',
//     no: '1',
//     id: 'A001',
//     length: 60,
//     width: 70,
//   },
//   {
//     key: '2',
//     no: '2',
//     id: 'A002',
//     length: 66,
//     width: 89,
//   },
//   {
//     key: '3',
//     no: '3',
//     id: 'A003',
//     length: 90,
//     width: 70,
//   },
//   {
//     key: '4',
//     no: '4',
//     id: 'A004',
//     length: 99,
//     width: 89,
//   },
// ];

// ColumnData 예시
// const column : ColumnDataType[] = [
//   {
//     title: '코일 ID',
//     dataIndex: 'id',
//     sortable: false,
//     fix: true,              // 왼쪽에 고정, 오른쪽 고정이고 싶으면 'right'로 넣기
//   },
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
//     sortable: {
//       compare: (a, b) => a.width - b.width,
//       multiple: 1,
//     },
//   },
// ];

interface TableComponentProps {
  pagination?: false | TablePaginationConfig;
  useCheckBox: boolean;
  // Config
  columns: ColumnDataType[];
  data: DataType[];
  handleRowClick?: (record?: DataType, rowIndex?: number) => void; // Row click event handler
  handleRowsClick?: (selectedRows: DataType[]) => void; // useCheckBox event handler, 데이터를 가지고 다룰 정보 처리 함수
  scroll?: { x?: number | string; y?: number | string }; // 스크롤 설정
}

export const Table: React.FC<TableComponentProps> = ({
  pagination = false,
  useCheckBox,
  columns,
  data,
  handleRowClick,
  handleRowsClick,
  scroll,
}) => {
  const processedColumns = createColumns(columns);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
      handleRowsClick!(selectedRows);
    },
  };
  return (
    <div className={styles.tableContainer}>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              // headerBg: '#eff4ff90',
              // rowSelectedBg: '#eff4ff',
            },
          },
        }}>
        <AntTable
          pagination={pagination ? pagination : false}
          rowSelection={useCheckBox ? rowSelection : undefined}
          className={styles.antTable}
          columns={processedColumns}
          dataSource={data}
          // onChange={onTableChange}
          onRow={
            handleRowClick
              ? (record, rowIndex) => ({
                  onClick: () => handleRowClick!(record, rowIndex), // Click event handler
                })
              : undefined
          }
          scroll={scroll}
          // TODO: rowClassName을 가지고 선택된, 호버된, row들의 클래스이름을 줘서 색을 바꾸게!
          // rowClassName={(_, index) => {}}
        />
      </ConfigProvider>
    </div>
  );
};

export default Table;
