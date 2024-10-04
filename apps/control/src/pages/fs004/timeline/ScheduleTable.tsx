import { Table } from '@postcoil/ui';
import { ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';

import { ScheduleDataType } from '@/config/scheduling/contentConfig';
import { WorkInstructionsDTO } from '@/config/scheduling/dto';
import { useWorkInstructionStore } from '@/store/fs004store';
import {
  scheduleColumnData,
  transformedScheduleData,
} from '@/utils/scheduling/tableUtilsSch';

const ScheduleTable = () => {
  const workInstructionData = useWorkInstructionStore(
    (state) => state.data as WorkInstructionsDTO[],
  );

  const [selectedRowScheduleNo, setSelectedRowScheduleNo] = useState<
    string | null
  >(null);
  const setSelectedData = useWorkInstructionStore((state) => state.setData!);

  const [dataSource, setDataSource] = useState<ScheduleDataType[]>([]);

  const handleRowClick = (record: { scheduleNo: string }) => {
    setSelectedRowScheduleNo(record.scheduleNo); // scheduleNo로 설정
    setSelectedData(record.scheduleNo); // string 타입으로 호출
  };

  const handleSelectedSchedule = (record: {
    scheduleNo: string;
  }): React.CSSProperties => {
    return record.scheduleNo === selectedRowScheduleNo
      ? { backgroundColor: '#E0E7FF', color: '#007bff', fontWeight: '500' }
      : {}; // 기본 스타일
  };

  useEffect(() => {
    console.log(workInstructionData);
    if (workInstructionData && workInstructionData.length > 0) {
      setDataSource(transformedScheduleData(workInstructionData));
      const firstScheduleNo = workInstructionData[0].scheduleNo; // 첫 번째 값의 scheduleNo
      setSelectedRowScheduleNo(firstScheduleNo); // 첫 번째 값의 scheduleNo 설정
      setSelectedData(firstScheduleNo); // 첫 번째 값의 scheduleNo 설정
    } else {
      setDataSource([]);
    }
  }, [workInstructionData]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            rowHoverBg: '#eff4ff',
          },
        },
      }}>
      <Table
        data={dataSource}
        columns={scheduleColumnData}
        size="small"
        handleRowClick={handleRowClick}
        handleSelectedStyle={handleSelectedSchedule}
      />
    </ConfigProvider>
  );
};

export default ScheduleTable;
