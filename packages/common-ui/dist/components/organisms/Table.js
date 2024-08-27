import { jsx as _jsx } from "react/jsx-runtime";
import { Table as AntTable, ConfigProvider } from 'antd';
import { useState } from 'react';
import styles from './Table.module.css';
import { createColumns } from '../../utils/TableUtils';
export const Table = ({ pagination = false, useCheckBox = false, columns, data, handleRowClick, handleRowsClick, scroll, size, tableLayout, className, rowClassName, }) => {
    const processedColumns = [...createColumns(columns)];
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys, selectedRows) => {
            setSelectedRowKeys(newSelectedRowKeys);
            if (handleRowsClick) {
                handleRowsClick(selectedRows);
            }
        },
    };
    return (_jsx("div", { className: styles.tableContainer, children: _jsx(ConfigProvider, { theme: {
                components: {
                    Table: {
                    // headerBg: '#eff4ff',
                    // rowSelectedBg: '#eff4ff',
                    },
                },
            }, children: _jsx(AntTable, { pagination: pagination || false, rowSelection: useCheckBox ? rowSelection : undefined, className: `${styles.antTable} ${className}`, columns: processedColumns, dataSource: data, onRow: handleRowClick
                    ? (record, rowIndex) => ({
                        onClick: () => handleRowClick(record, rowIndex),
                    })
                    : undefined, scroll: scroll ? scroll : undefined, size: size ? 'small' : 'large', tableLayout: tableLayout ? 'fixed' : undefined, rowClassName: rowClassName }) }) }));
};
export default Table;
//# sourceMappingURL=Table.js.map