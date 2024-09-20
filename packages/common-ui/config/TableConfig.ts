import { ColumnType } from 'antd/es/table';

// Dataset Type
export interface DataType {
  key?: string | number;
  no?: string | number;
  id?: string;
  [key: string]: unknown;
}

// ColumnDataType
export interface ColumnDataType<T> extends ColumnType<T> {
  no?: string | number;
  title: string | JSX.Element;
  dataIndex: string;
  key?: string;
  sortable?: // sorting 여부
  | boolean // true일 경우 그냥 기본 sorting 함수 사용됨 (grouping sorting 불가)
    | { compare: (a: any, b: any) => number; multiple?: number }; // sorting custom 함수, grouping sorting 가능
  fixed?: boolean | 'left' | 'right'; // fix 여부, true일 경우 'left'로, string일 경우 ('right') 로 고정
  width?: number | string;
  otherProps?: { [key: string]: any }; // 기타 props
}
