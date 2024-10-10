import { Tag } from 'antd';

export const errFacilitycolumn = [
  {
    title: '공정명',
    dataIndex: 'facilityId',
  },
];

export const errFacilityErrColumn = [
  {
    title: '설비사양 에러',
    dataIndex: 'columnName',
  },
  {
    title: '값',
    dataIndex: 'value',
    render: (text: string) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <div>{text}</div>
        <div style={{ marginRight: '45%' }}>
          <Tag color="blue">mm</Tag>
        </div>
      </div>
    ),
  },
];

export const ManageColumn = [
  {
    title: '관리재',
    dataIndex: 'columnName',
  },
  {
    title: '값',
    dataIndex: 'value',
  },
];

export const infoErrColumn = [
  {
    title: '정보이상재',
    dataIndex: 'columnName',
    width: '50%',
  },
  {
    title: '값',
    dataIndex: 'value',
    width: '50%',
  },
];

export const errFacilityData = [
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

// export const facilityErrData = [
//   { key: '1', id: '1', columnName: '두께', value: '5mm' },
//   { key: '2', id: '2', columnName: '폭', value: '10mm    ' },
//   { key: '3', id: '3', columnName: '최대 폭', value: '5mm' },
//   { key: '4', id: '4', columnName: '최소폭', value: '10mm    ' },
// ];

// export const managementData = [
//   { key: '1', id: '1', columnName: '자동차용도제약', value: 'ATOS' },
// ];

// export const infoErrData = [
//   { key: '1', id: '1', columnName: '공장공정코드', value: 'NULL' },
//   { key: '2', id: '2', columnName: '주문번호', value: 'NULL' },
//   { key: '3', id: '3', columnName: '잔공장공정코드', value: 'NULL' },
//   { key: '4', id: '4', columnName: '롤단위구분', value: '@&%$!' },
//   { key: '5', id: '5', columnName: '품명', value: 'NULL' },
// ];

export const errColumnMapping: { [key: string]: string } = {
  max_width: '최대폭',
  min_width: '최소폭',
  max_thickness: '최대두께',
  min_thickness: '최소두께',
  coil_type_code: '자동차용도제약',
  factory_code: '공장공정코드',
  order_no: '주문번호',
  rem_proc: '잔공장공정코드',
  roll_unit: '품명',
};

export const errKeyMapping: { [key: string]: string } = {
  최대폭: 'maxWidth',
  최소폭: 'minWidth',
  최대두께: 'maxThickness',
  최소두께: 'minThickness',
  자동차용도제약: 'coilTypeCode',
  공장공정코드: 'factoryCode',
  주문번호: 'orderNo',
  잔공장공정코드: 'remProc',
  품명: 'rollUnit',
};
