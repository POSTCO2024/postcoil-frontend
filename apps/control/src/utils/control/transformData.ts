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
}

export interface ApiResponse {
  status: number;
  result: ApiResponseItem[];
  resultMsg?: string;
}

// 변환
export const transformData = (apiData: ApiResponseItem[]): any[] => {
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
    remarks: item.order.remarks,
  }));
};

const formatDate = (dueDate: string) => {
  return new Date(dueDate).toISOString().split('T')[0];
};
