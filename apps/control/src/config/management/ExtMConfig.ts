export const columnData = [
  {
    title: '공정명',
    dataIndex: 'facilityId',
    sorter: {
      compare: (a: any, b: any) => a.no - b.no,
      multiple: 3,
    },
  },
];

export const columnsData = [
  {
    title: '항목',
    dataIndex: 'column',

    sorter: {
      compare: (a: any, b: any) => a.no - b.no,
      multiple: 3,
    },
  },
  {
    title: '값',
    dataIndex: 'value',
    sorter: {
      compare: (a: any, b: any) => a.no - b.no,
      multiple: 3,
    },
  },
];
export const standardData = [
  { key: '1', id: '1', column: '공장코드', value: 'L' },
  { key: '2', id: '2', column: '공정코드', value: '1L1' },
  { key: '3', id: '3', column: '재료상태구분', value: '2' },
  { key: '4', id: '4', column: '진도구분', value: 'D' },
];

export const facilityData = [
  { key: '1', id: '1', facilityId: '1PCM' },
  { key: '2', id: '2', facilityId: '2PCM' },
  { key: '3', id: '3', facilityId: '1CAL' },
  { key: '4', id: '4', facilityId: '2CAL' },
];
