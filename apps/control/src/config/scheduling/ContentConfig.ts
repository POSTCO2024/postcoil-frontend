import { DataType } from '@postcoil/ui/config/TableConfig';

// Table Data Interface 정의
export interface MaterialDataType extends DataType {
  key?: string | number;
  materialNo?: string;
  opCode?: string;
  currProc?: string;
  type?: string;
  status?: string;
  progress?: string;
  rollUnit?: string;
  outerDia?: number | string;
  innerDia?: number | string;
  width?: number | string;
  temperature?: number | string;
  length?: number | string;
  thickness?: number | string;
  weight?: number | string;
  passProc?: string | null;
  preProc?: string | null;
  nextProc?: string | null;
  storageLoc?: string;
  yard?: string | number;
  sequence?: number[] | string[] | string | number;
  goalWidth?: number | string;
  goalThickness?: number | string;
  changed?: boolean;
}
