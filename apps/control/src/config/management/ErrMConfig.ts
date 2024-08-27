export const facilitycolumn = [
  {
    title: '공정명',
    dataIndex: 'facilityId',
    sorter: {
      compare: (a: any, b: any) => a.no - b.no,
      multiple: 3,
    },
  },
];

export const facilityErrColumn = [
  {
    title: '설비사양 에러',
    dataIndex: 'columnName',
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

export const ManageColumn = [
  {
    title: '관리재',
    dataIndex: 'columnName',
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

export const infoErrColumn = [
  {
    title: '정보이상재',
    dataIndex: 'columnName',
    sorter: {
      compare: (a: any, b: any) => a.no - b.no,
      multiple: 3,
    },
    width: '50%',
  },
  {
    title: '값',
    dataIndex: 'value',
    sorter: {
      compare: (a: any, b: any) => a.no - b.no,
      multiple: 3,
    },
    width: '50%',
  },
];

export const facilityData = [
  { key: '1', id: '1', facilityId: '1PCM' },
  { key: '2', id: '2', facilityId: '2PCM' },
  { key: '3', id: '3', facilityId: '1CAL' },
  { key: '4', id: '4', facilityId: '2CAL' },
  { key: '5', id: '5', facilityId: '1EGL' },
  { key: '6', id: '6', facilityId: '2EGL' },
  { key: '7', id: '7', facilityId: '1CGL' },
  { key: '8', id: '8', facilityId: '2CGL' },
  { key: '9', id: '9', facilityId: '포장' },
];

export const facilityErrData = [
  { key: '1', id: '1', columnName: '두께', value: '5mm' },
  { key: '2', id: '2', columnName: '폭', value: '10mm    ' },
];

export const managementData = [
  { key: '1', id: '1', columnName: '자동차용도제약', value: 'd' },
];

export const infoErrData = [
  { key: '1', id: '1', columnName: '공장공정코드', value: '1CAL' },
  { key: '2', id: '2', columnName: '주문번호', value: 'CMD001' },
  { key: '3', id: '3', columnName: '잔공장공정코드', value: '2CAL' },
  { key: '4', id: '4', columnName: '롤단위구분', value: 'AA' },
  { key: '5', id: '5', columnName: '품명', value: '10mm' },
];
