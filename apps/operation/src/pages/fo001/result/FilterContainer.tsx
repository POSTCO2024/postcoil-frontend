import { RedoOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Dropdown } from '@postcoil/ui';
import { Button } from '@postcoil/ui/components/atoms/Button';
import { RedButton } from '@postcoil/ui/components/atoms/RedButton';
import axios from 'axios';
import { useEffect, useState } from 'react';

import styles from './FilterContainer.module.scss';

import { ClientDTO } from '@/config/dto';
import { useWorkInstructionStore } from '@/store/fo001store';
import { options } from '@/utils/dropdownUtils';
import { mockRollUnitName } from '@/utils/MockDropdown';

const operationUrl = import.meta.env.VITE_OPERATION_API_URL;

interface dropDownOptionType {
  value: string;
  // label을 ReactNode로 지정하여 jsx형식 return이 가능케함
  label: React.ReactNode;
  icon?: React.ReactNode;
}

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
  const [scheduleNoList, setScheduleNoList] = useState<dropDownOptionType[]>(
    [],
  );
  // 선택된 processCode에 따라 fetch 해 온 옵션 생성

  const [processCode, setProcessCode] = useState<string[]>([
    selectedProcessCode,
  ]);

  const [selectedRollUnitName, setSelectedRollUnitName] = useState<string[]>(
    [],
  );

  const handleProcessCode = (value?: string[]) => {
    if (value && value[0] !== '') {
      setProcessCode(value);
      setSelectedRollUnitName([]);
      fetchData(value); // fetchData 함수 호출
    } else if (value) {
      setProcessCode(value);
    } else {
      setProcessCode([]);
      setSelectedRollUnitName([]);
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

  const requestCoil = async (workInstructionId: string) => {
    try {
      const response = await axios.post(
        operationUrl +
          '/api/coil-work/request-supply/' +
          workInstructionId +
          '?supplyCount=1',
      );
      console.log(response);
    } catch (errors) {
      console.log(errors);
    }
  };
  // Reject 함수
  const rejectCoil = async (workInstructionId: any, id: any) => {
    try {
      const response = await axios.post(
        operationUrl + '/api/coil-work/reject/' + workInstructionId + '/' + id,
      );
      console.log(response);
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    if (selectedData && selectedData.length > 0) {
      setProcessCode([
        selectedProcessCode !== '' ? selectedProcessCode : '1CAL',
      ]);
      setScheduleNoList(generateDynamicRollUnitOptions(selectedData));
      setSelectedRollUnitName([selectedData[0].workInstructions.scheduleNo]);
    } else {
      setProcessCode([]);
      setSelectedRollUnitName([]);
    }

    console.log('filtercontainer3', selectedData);
  }, [selectedData]);

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
      <div>
        <Dropdown
          title="스케줄명"
          options={selectedData ? scheduleNoList : mockRollUnitName}
          value={selectedRollUnitName}
          onChange={handleRollUnitChange} // 스케줄 선택 시 데이터 매핑 처리
        />
      </div>
      <div className={styles.btns}>
        <Button
          text={'보급요구'}
          style={true}
          onClick={() => requestCoil('workInstructionId')}
        />
        <RedButton
          text={'REJECT'}
          style={true}
          onClick={() => rejectCoil('workInstructionId', 'coilId')}
        />
        {/* <Button text={'긴급정지'} style={true} /> */}
      </div>
    </div>
  );
};

export default FilterContainer;
