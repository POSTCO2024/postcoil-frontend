import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox'; // CheckBox
import { ColumnsType } from 'antd/es/table'; // Table

// Dataset Type
interface DataType {
  key: string;
  no: string;
  [key: string]: unknown;
  scheduleId: string;
  createdDate: string;
  rollID: string;
  facility: string;
  startTime: string;
  endTime: string;
}

// Dataset Column
export const createColumns = (
  useCheckBox: boolean,
  columnsData: Partial<DataType>[],
): ColumnsType<DataType> => {
  const columns: ColumnsType<DataType> = columnsData.map((column) => ({
    title: column.title as string,
    dataIndex: column.dataIndex as string,
    sorter: column.sorter as (a: unknown, b: unknown) => number,
    ...(column.otherProps || {}), // 추가: 기타 다른 props 전달을 위한 설정
  }));

  // == Props로 받기 (columns, data) ==
  //   {
  //     title: 'no',
  //     dataIndex: 'no',
  //   },
  //   {
  //     title: '코일 ID',
  //     dataIndex: 'id',
  //     sorter: {
  //       compare: (a, b) => a.id.localeCompare(b.id),
  //       multiple: 3,
  //     },
  //   },
  //   {
  //     title: '두께',
  //     dataIndex: 'length',
  //     sorter: {
  //       compare: (a, b) => a.length - b.length,
  //       multiple: 2,
  //     },
  //   },
  //   {
  //     title: '폭',
  //     dataIndex: 'width',
  //     sorter: {
  //       compare: (a, b) => a.width - b.width,
  //       multiple: 1,
  //     },
  //   },
  // ];

  if (useCheckBox) {
    // ** checkbox 설정 - true/false **
    columns.push({
      title: 'check', // 컬럼명 수정 필요
      dataIndex: 'select',
      render: (_, record) => (
        <Checkbox onChange={(e) => onCheckboxChange(e, record.key)} />
      ),
    });
  }

  return columns;
};

// // Dataset Value
// export const data: DataType[] = [
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

// CheckBox Event
export const onCheckboxChange = (e: CheckboxChangeEvent, key: string): void => {
  console.log(`Checkbox for row ${key} checked = ${e.target.checked}`);
};
