export const columnData = [
  {
    title: '공정명',
    dataIndex: 'facilityId',
  },
];

export const columnsData = [
  {
    title: '추출기준',
    dataIndex: 'columnName',
  },
  {
    title: '값',
    dataIndex: 'value',
  },
];

// export const standardData = [
//   { key: '1', id: '1', columnName: '공장코드', value: 'L' },
//   { key: '2', id: '2', columnName: '공정코드', value: '1CAL' },
//   { key: '3', id: '3', columnName: '재료상태구분', value: '2' },
//   { key: '4', id: '4', columnName: '진도구분', value: 'D' },
// ];

export const columnMapping: { [key: string]: string } = {
  factory_code: '공장코드',
  curr_proc: '공정코드',
  material_status: '재료상태구분',
  progress: '진도구분',
};

export const keyMapping: { [key: string]: string } = {
  공장코드: 'factoryCode',
  재료상태구분: 'materialStatus',
  진도구분: 'progress',
  공정코드: 'currProc',
};

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
