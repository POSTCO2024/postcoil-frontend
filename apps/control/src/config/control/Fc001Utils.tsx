// 1) List 임의 데이터
export const columnsList = [
  {
    title: '번호',
    dataIndex: 'id',
    key: 'id',
    fixed: true,
  },
  {
    title: '코일 번호',
    dataIndex: 'materialNo',
    key: 'no',
    fixed: true,
  },
  {
    title: '공장 코드',
    dataIndex: 'fcode',
    key: 'f_code',
  },
  {
    title: '재료 유형',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '조업 코드',
    dataIndex: 'op_code',
    key: 'op_code',
  },
  {
    title: '재료 진행 상태',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '진행 진도',
    dataIndex: 'progress',
    key: 'progress',
  },
  {
    title: '두께',
    dataIndex: 'thickness',
    key: 'thickness',
  },
  {
    title: '폭',
    dataIndex: 'width',
    key: 'width',
  },
  {
    title: '길이(mm)',
    dataIndex: 'length',
    key: 'length',
  },
  {
    title: '단중(kg/m)',
    dataIndex: 'weight',
    key: 'weight',
  },
  {
    title: '통과 공정',
    dataIndex: 'passProc',
    key: 'pass_proc',
  },
  {
    title: '잔공정',
    dataIndex: 'remProc',
    key: 'rem_proc',
  },
  {
    title: '전공정',
    dataIndex: 'preProc',
    key: 'pre_proc',
  },
  {
    title: '차공정',
    dataIndex: 'nextProc',
    key: 'next_proc',
  },
  {
    title: '저장 위치',
    dataIndex: 'storageLoc',
    key: 'storage_loc',
  },
  {
    title: '야드 위치',
    dataIndex: 'yard',
    key: 'yard',
  },
  {
    title: '코일 품종 코드',
    dataIndex: 'coilTypeCode',
    key: 'coil_type_code',
  },
  {
    title: '주문 번호',
    dataIndex: 'orderNo',
    key: 'order_no',
  },
  {
    title: '고객사',
    dataIndex: 'customerName',
    key: 'customer_name',
  },
  {
    title: '주문 폭',
    dataIndex: 'goalWidth',
    key: 'goal_width',
  },
  {
    title: '주문 두께',
    dataIndex: 'goalThickness',
    key: 'goal_thickness',
  },
  {
    title: '주문 길이',
    dataIndex: 'goalLength',
    key: 'goal_lngth',
  },
  {
    title: '납기일',
    dataIndex: 'dueDate',
    key: 'due_date',
  },
  {
    title: '비고',
    dataIndex: 'remarks',
    key: 'remarks',
  },
];

//2) Table 임의 데이터
export const columnsTable = [
  {
    title: '품명', // Row Header Title
    dataIndex: 'coilTypeCode',
    key: 'key',
  },
  {
    title: '총 합계',
    dataIndex: 'totalCnt',
    key: 'total',
  },
  {
    title: '1CAL',
    dataIndex: 'proc1CAL',
    key: 'cal1',
  },
  {
    title: '2CAL',
    dataIndex: 'proc2CAL',
    key: 'cal2',
  },
  // {
  //   title: '1CAL',
  //   dataIndex: 'cal1',
  //   key: 'cal1',
  // },
  // {
  //   title: '2CAL',
  //   dataIndex: 'cal2',
  //   key: 'cal2',
  // },
  {
    title: '1EGL',
    dataIndex: 'proc1EGL',
    key: 'egl1',
  },
  {
    title: '2EGL',
    dataIndex: 'proc2EGL',
    key: 'egl2',
  },
  {
    title: '1CGL',
    dataIndex: 'proc1CGL',
    key: 'cgl1',
  },
  {
    title: '2CGL',
    dataIndex: 'proc2CGL',
    key: 'cgl2',
  },
  {
    title: '1냉연 포장',
    dataIndex: 'proc1Packing',
    key: '1packing',
  },
  {
    title: '2냉연 포장',
    dataIndex: 'proc2Packing',
    key: '2packing',
  },
];

export const dataTable = [
  // key: Row Header에 들어갈 값 => 품명 데이터
  // 잔공정의 수치
  {
    key: 'AA',
    total: 50,
    packing: 21,
    unpacking: 0,
    egl1: 12,
    egl2: 3,
    cgl1: 10,
    cgl2: 11,
  },
  {
    key: 'BB',
    total: 42,
    packing: 1,
    unpacking: 1,
    egl1: 2,
    egl2: 3,
    cgl1: 12,
    cgl2: 11,
  },
  {
    key: 'CC',
    total: 33,
    packing: 6,
    unpacking: 3,
    egl1: 2,
    egl2: 4,
    cgl1: 9,
    cgl2: 13,
  },
  {
    key: 'DD',
    total: 45,
    packing: 1,
    unpacking: 1,
    egl1: 12,
    egl2: 6,
    cgl1: 7,
    cgl2: 1,
  },
  {
    key: 'EE',
    total: 31,
    packing: 2,
    unpacking: 0,
    egl1: 10,
    egl2: 11,
    cgl1: 7,
    cgl2: 2,
  },
];
