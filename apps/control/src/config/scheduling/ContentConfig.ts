import { DataType } from '@postcoil/ui/config/TableConfig';

// Table Data Interface 정의
export interface MaterialDataType extends DataType {
  key?: any;
  materialNumber: string;
  materialStatus: string;
  operationCode: string;
  processCode: string;
  materialType: string;
  materialProgress: string;
  materialGroup: string;
  outerDiameter?: number | string;
  innerDiameter?: number | string;
  width: number | string;
  length: number | string;
  thickness: number | string;
  unitWeight: number | string;
  passedProcess: string | null;
  previousProcess: string | null;
  nextProcess: string | null;
  storageLocation?: string;
  yardDivision?: string;
  orderNumber?: string;
  changed?: boolean;
  targetWidth: number | string;
  targetThickness: number | string;
}
