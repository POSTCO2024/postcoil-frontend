// ** 데이터를 Antd 테이블에 들어가는 columns로 자동 변환해주는 함수 **
export const createColumns = (columnsData) => {
    const columns = columnsData.map((column) => {
        const columnConfig = {
            title: column.title,
            dataIndex: column.dataIndex,
            key: column.dataIndex,
            sorter: column.sortable
                ? typeof column.sortable === 'boolean'
                    ? (a, b) => a[column.dataIndex] > b[column.dataIndex] ? 1 : -1
                    : {
                        compare: column.sortable.compare,
                        multiple: column.sortable.multiple || 1,
                    }
                : undefined,
            fixed: column.fixed
                ? column.fixed === 'right'
                    ? column.fixed
                    : 'left'
                : undefined,
            align: column.align,
            width: column.width ? column.width : undefined,
            render: column.render,
            ...(column.otherProps || {}), // 추가: 기타 다른 props 전달을 위한 설정
        };
        return columnConfig;
    });
    return columns;
};
// == 결과 ==
//   {
//     title: 'no',
//     dataIndex: 'no',
//   },
//   {
//     title: '코일 ID',
//     dataIndex: 'id',
//     sorter: {
//       compare: (a, b) => a.id.localeCompare(b.id),
//       multiple: 3,
//     },
//   },
//   {
//     title: '두께',
//     dataIndex: 'length',
//     sorter: {
//       compare: (a, b) => a.length - b.length,
//       multiple: 2,
//     },
//   },
//   {
//     title: '폭',
//     dataIndex: 'width',
//     sorter: {
//       compare: (a, b) => a.width - b.width,
//       multiple: 1,
//     },
//   },
// ];
//# sourceMappingURL=TableUtils.js.map