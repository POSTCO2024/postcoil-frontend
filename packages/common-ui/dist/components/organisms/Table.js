import { jsx as _jsx } from "react/jsx-runtime";
import { Table as AntTable, Checkbox } from 'antd';
import styles from './Table.module.css';
const columns = [
    {
        title: 'no',
        dataIndex: 'no',
    },
    {
        title: '코일 ID',
        dataIndex: 'id',
        sorter: {
            compare: (a, b) => a.id.localeCompare(b.id),
            multiple: 3,
        },
    },
    {
        title: '두께',
        dataIndex: 'length',
        sorter: {
            compare: (a, b) => a.length - b.length,
            multiple: 2,
        },
    },
    {
        title: '폭',
        dataIndex: 'width',
        sorter: {
            compare: (a, b) => a.width - b.width,
            multiple: 1,
        },
    },
    // ** checkbox 설정 - true/false **
    {
        title: 'Error Pass', // 컬럼명 수정 필요
        dataIndex: 'select',
        render: (_, record) => (_jsx(Checkbox, { onChange: (e) => onCheckboxChange(e, record.key) })),
    },
];
const data = [
    {
        key: '1',
        no: '1',
        id: 'A001',
        length: 60,
        width: 70,
    },
    {
        key: '2',
        no: '2',
        id: 'A002',
        length: 66,
        width: 89,
    },
    {
        key: '3',
        no: '3',
        id: 'A003',
        length: 90,
        width: 70,
    },
    {
        key: '4',
        no: '4',
        id: 'A004',
        length: 99,
        width: 89,
    },
];
// Column Event
const onTableChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};
// CheckBox Event
const onCheckboxChange = (e, key) => {
    console.log(`Checkbox for row ${key} checked = ${e.target.checked}`);
};
export const Table = () => {
    return (_jsx("div", { className: styles.tableContainer, children: _jsx(AntTable, { className: styles.antTable, columns: columns, dataSource: data, onChange: onTableChange }) }));
};
export default Table;
//# sourceMappingURL=Table.js.map