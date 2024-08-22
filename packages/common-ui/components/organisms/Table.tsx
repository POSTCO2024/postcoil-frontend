import {
  Table as AntTable,
  // Checkbox,
  ConfigProvider,
  TablePaginationConfig,
} from 'antd';
import React, { useState } from 'react';

import styles from './Table.module.scss';
import { DataType, ColumnDataType } from '../../config/TableConfig';
import { createColumns } from '../../utils/TableUtils';

// ** INFO **
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
// const column : ColumnDataType<DataType>[] = [
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

interface TableComponentProps<T extends DataType> {
  pagination?: false | TablePaginationConfig;
  useCheckBox?: boolean;
  columns: ColumnDataType<T>[];
  data: T[];
  handleRowClick?: (record?: T, rowIndex?: number) => void; // Row click event handler
  handleRowsClick?: (selectedRows: T[]) => void; // useCheckBox event handler, 데이터를 가지고 다룰 정보 처리 함수
  scroll?: { x?: number | string; y?: number | string }; // 스크롤 설정
  size?: string;
  tableLayout?: string | undefined;
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
}: TableComponentProps<T>) => {
  const processedColumns = [
    // ...(useCheckBox
    //   ? [
    //       {
    //         title: <Checkbox />,
    //         dataIndex: 'selection',
    //         key: 'selection',
    //         fixed: 'left', // Fixed to the left
    //         width: 60,
    //         render: (_: any, record: any) => (
    //           <Checkbox
    //             checked={selectedRowKeys.includes(record.key)}
    //             onChange={() => {
    //               const newSelectedRowKeys = selectedRowKeys.includes(
    //                 record.key,
    //               )
    //                 ? selectedRowKeys.filter((key) => key !== record.key)
    //                 : [...selectedRowKeys, record.key];
    //               setSelectedRowKeys(newSelectedRowKeys);
    //               const selectedRows = data.filter((item) =>
    //                 newSelectedRowKeys.includes(item.key),
    //               );

    //               console.log(selectedRows);
    //               console.log(selectedRows.length);
    //               if (handleRowsClick) {
    //                 handleRowsClick(selectedRows);
    //               }
    //             }}
    //           />
    //         ),
    //       },
    //     ]
    //   : []),
    ...createColumns(columns),
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[], selectedRows: T[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
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
          className={styles.antTable}
          columns={processedColumns}
          dataSource={data}
          onRow={
            handleRowClick
              ? (record, rowIndex) => ({
                  onClick: () => handleRowClick(record, rowIndex),
                })
              : undefined
          }
          scroll={scroll}
        />
      </ConfigProvider>
    </div>
  );
};

export default Table;
