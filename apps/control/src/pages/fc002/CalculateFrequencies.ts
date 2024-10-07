// 데이터의 타입 정의
export interface Material {
  targetId: number;
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
  processPlan: string;
  passProc: string | null;
  remProc: string;
  preProc: string | null;
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
  rollUnitName: string;
  remarks: string | null;
}

// 빈도 계산 함수 타입
type FrequencyMap = { [key: string]: number };

// 빈도 계산 함수
export function calculateFrequency(
  data: Material[],
  key: keyof Material,
): FrequencyMap {
  return data.reduce<FrequencyMap>((acc, item) => {
    const value = item[key] as string; // 'key'의 값을 string으로 처리
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}
