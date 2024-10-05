// import { ApiResponseItem } from '../../pages/fc001/Fc001';

// Type 정의
export interface MaterialDTO {
  no: string;
  factoryCode: string;
  materialType: string;
  opCode: string;
  progress: string;
  thickness: number;
  width: number;
  length: number;
  weight: number;
  passProc: string;
  remProc: string;
  preProc: string;
  nextProc: string;
  storageLoc: string;
  yard: string;
  coilTypeCode: string;
}

export interface OrderDTO {
  no: string;
  customer: string;
  width: number;
  thickness: number;
  length: number;
  dueDate: string;
  remarks: string;
}

export interface ApiResponseItem {
  targetId: string;
  errorType: string;
  material: MaterialDTO;
  order: OrderDTO;
  processPlan: string;
  rollUnitName: string;
  remarks: string;
}

export interface ApiResponse {
  status: number;
  result: ApiResponseItem[];
  resultMsg?: string;
}

// 변환할 데이터의 타입 정의
export interface TransformedData {
  targetId: string;
  materialNo: string;
  errorType: string;
  factoryCode: string;
  materialType: string;
  opCode: string;
  progress: string;
  thickness: number;
  width: number;
  length: number;
  weight: number;
  passProc: string;
  remProc: string;
  preProc: string;
  nextProc: string;
  storageLoc: string;
  yard: string;
  coilTypeCode: string;
  orderNo: string;
  customerName: string;
  goalWidth: number;
  goalThickness: number;
  goalLength: number;
  dueDate: string;
  remarks: string;
}

// 변환
export const transformData = (
  apiData: ApiResponseItem[],
): TransformedData[] => {
  return apiData.map((item) => ({
    targetId: item.targetId,
    materialNo: item.material.no,
    errorType: item.errorType,
    factoryCode: item.material.factoryCode,
    materialType: item.material.materialType,
    opCode: item.material.opCode,
    progress: item.material.progress,
    thickness: item.material.thickness,
    width: item.material.width,
    length: item.material.length,
    weight: item.material.weight,
    processPlan: item.processPlan,
    passProc: item.material.passProc,
    remProc: item.material.remProc,
    preProc: item.material.preProc,
    nextProc: item.material.nextProc,
    storageLoc: item.material.storageLoc,
    yard: item.material.yard,
    coilTypeCode: item.material.coilTypeCode,
    orderNo: item.order.no,
    customerName: item.order.customer,
    goalWidth: item.order.width,
    goalThickness: item.order.thickness,
    goalLength: item.order.length,
    dueDate: formatDate(item.order.dueDate),
    rollUnitName: item.rollUnitName,
    remarks: item.remarks,
  }));
};

const formatDate = (dueDate: string) => {
  return new Date(dueDate).toISOString().split('T')[0];
};
