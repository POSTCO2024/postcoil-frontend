import { ColumnType } from 'antd/es/table';
export interface DataType {
    key?: string | number;
    no?: string | number;
    id?: string;
    [key: string]: unknown;
}
export interface ColumnDataType<T> extends ColumnType<T> {
    no?: string | number;
    title: string | JSX.Element;
    dataIndex: string;
    key?: string;
    sortable?: boolean | {
        compare: (a: any, b: any) => number;
        multiple?: number;
    };
    fixed?: boolean | 'left' | 'right';
    width?: number | string;
    otherProps?: {
        [key: string]: any;
    };
}
//# sourceMappingURL=TableConfig.d.ts.map