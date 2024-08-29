import { TablePaginationConfig } from 'antd';
import { DataType, ColumnDataType } from '../../config/TableConfig';
interface TableComponentProps<T extends DataType> {
    pagination?: false | TablePaginationConfig;
    useCheckBox?: boolean;
    columns: ColumnDataType<T>[];
    data: T[];
    handleRowClick?: (record?: any, rowIndex?: number) => void;
    handleRowsClick?: (selectedRows: T[]) => void;
    scroll?: {
        x?: number | string;
        y?: number | string;
    };
    size?: string;
    tableLayout?: string | undefined;
    className?: string;
    rowClassName?: (record: any) => string;
}
export declare const Table: <T extends DataType>({ pagination, useCheckBox, columns, data, handleRowClick, handleRowsClick, scroll, size, tableLayout, className, rowClassName, }: TableComponentProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Table;
//# sourceMappingURL=Table.d.ts.map