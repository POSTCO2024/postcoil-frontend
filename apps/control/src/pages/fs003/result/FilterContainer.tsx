import { RedoOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Dropdown } from '@postcoil/ui';
import { useState } from 'react';

import styles from './FilterContainer.module.scss';

import { dropDownOptionType } from '@/config/scheduling/dropdownConfig';
import { ClientDTO } from '@/config/scheduling/dto';
import { useWorkInstructionStore } from '@/store/fs003store';
import { options } from '@/utils/scheduling/dropdownUtils';
import { mockRollUnitName } from '@/utils/scheduling/MockDropdown';

const FilterContainer = () => {
  const fetchData = useWorkInstructionStore((state) => state.fetchData!);
  const selectedProcessCode = useWorkInstructionStore(
    (state) => state.processCode!,
  );
  const setData = useWorkInstructionStore(
    (state) => state.setData!, // processCode 업데이트 함수
  );
  const selectedData = useWorkInstructionStore((state) =>
    selectedProcessCode === '1CAL'
      ? (state.data as ClientDTO[])
      : (state.data2 as ClientDTO[]),
  );

  const generateDynamicRollUnitOptions = (
    data: ClientDTO[],
  ): dropDownOptionType[] => {
    return data.map((client) => {
      const scheduleNo = client.workInstructions.scheduleNo;
      const schStatus = client.workInstructions.schStatus;

      return {
        value: scheduleNo,
        label: (
          <div>
            {schStatus === 'IN_PROGRESS' ? (
              <RedoOutlined spin style={{ color: '#1677ff' }} />
            ) : (
              <ClockCircleOutlined style={{ color: '#1677ff' }} />
            )}
            <span style={{ marginLeft: 10 }}>{scheduleNo}</span>
          </div>
        ),
        icon:
          schStatus === 'IN_PROGRESS' ? (
            <RedoOutlined />
          ) : (
            <ClockCircleOutlined />
          ),
      };
    });
  };

  // 선택된 processCode에 따라 fetch 해 온 옵션 생성
  const scheduleNoList = selectedData
    ? generateDynamicRollUnitOptions(selectedData)
    : [];

  const [processCode, setProcessCode] = useState<string[]>([
    selectedProcessCode,
  ]);

  const [selectedRollUnitName, setSelectedRollUnitName] = useState<string[]>([
    scheduleNoList[0].value,
  ]);

  const handleProcessCode = (value?: string[]) => {
    if (value && value[0] !== '' && value[0] !== selectedProcessCode) {
      setProcessCode(value); // rollUnitName 초기화
      fetchData(value); // fetchData 함수 호출
    } else {
      setProcessCode([]);
    }
  };

  const handleRollUnitChange = (value?: string[]) => {
    if (value && value[0] !== '') {
      setSelectedRollUnitName(value);
      setData(
        selectedData.filter(
          (item) => item.workInstructions.scheduleNo === value[0],
        )[0],
      );
    } else {
      setSelectedRollUnitName([]);
    }
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown}>
        <Dropdown
          title="공정명"
          options={options}
          onChange={handleProcessCode}
          value={processCode}
        />
      </div>
      <Dropdown
        title="스케줄명"
        options={selectedData?.length > 0 ? scheduleNoList : mockRollUnitName}
        value={selectedRollUnitName}
        onChange={handleRollUnitChange} // 스케줄 선택 시 데이터 매핑 처리
      />
    </div>
  );
};

export default FilterContainer;
