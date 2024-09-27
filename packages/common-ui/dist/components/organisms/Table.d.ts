import { TablePaginationConfig } from 'antd';
import { DataType, ColumnDataType } from '../../config/TableConfig';
interface TableComponentProps<T extends DataType> {
    pagination?: false | TablePaginationConfig;
    useCheckBox?: boolean;
    columns: ColumnDataType<T>[];
    data: T[];
    handleRowClick?: (record?: any, rowIndex?: number) => void;
    handleRowsClick?: (selectedRows: any[]) => void;
    scroll?: {
        x?: number | string;
        y?: number | string;
    };
    size?: string;
    tableLayout?: string | undefined;
    className?: string;
    rowClassName?: (record: any) => string;
    rowKey?: string | ((record: T) => string);
    components?: any;
    setSelectedMaterials?: any;
}
export declare const Table: <T extends DataType>({ pagination, useCheckBox, columns, data, handleRowClick, handleRowsClick, scroll, size, tableLayout, className, rowClassName, rowKey, components, setSelectedMaterials, }: TableComponentProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Table;
//# sourceMappingURL=Table.d.ts.map