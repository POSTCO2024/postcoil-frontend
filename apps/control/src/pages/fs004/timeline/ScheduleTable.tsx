import { Table } from '@postcoil/ui';
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
  const handleRowClick = (record: { scheduleId: string }) => {
    console.log(record);
    // TODO
  };

  const [dataSource, setDataSource] = useState<ScheduleDataType[]>([]);

  useEffect(() => {
    console.log(workInstructionData);
    if (workInstructionData && workInstructionData.length > 0) {
      setDataSource(transformedScheduleData(workInstructionData));
    }
  }, [workInstructionData]);

  return (
    <Table
      data={dataSource}
      columns={scheduleColumnData}
      handleRowClick={handleRowClick}
      size="small"
    />
  );
};

export default ScheduleTable;
