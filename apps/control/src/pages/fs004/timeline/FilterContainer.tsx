import { Button, DatePicker, Dropdown } from '@postcoil/ui';
import { useEffect, useState } from 'react';

import styles from './FilterContainer.module.scss';

import { useWorkInstructionStore } from '@/store/fs004store';
import { options } from '@/utils/scheduling/dropdownUtils';

const FilterContainer = () => {
  const selectedProcessCode = useWorkInstructionStore(
    (state) => state.processCode,
  );
  const fetchWorkInstructionData = useWorkInstructionStore(
    (state) => state.fetchData!,
  );
  const cleanData = useWorkInstructionStore((state) => state.cleanData!);

  const [processCode, setProcessCode] = useState<string[] | undefined>();
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>('');

  const handleProcessCode = (value?: string[]) => {
    if (value && value[0] !== '') {
      setProcessCode(value);
      cleanData()!;
    } else {
      setProcessCode([]);
      cleanData()!;
    }
    setSelectedDateStr(null);
    useWorkInstructionStore.setState({ processCode: value && value[0] });
  };

  const parseDateRange = (dateRangeStr: string) => {
    const [startDateStr, endDateStr] = dateRangeStr.split(' - ');

    // 각각의 날짜를 월/일/연도 포맷으로 분리
    const startParts = startDateStr.split('/');
    const endParts = endDateStr.split('/');

    // 연도는 두 날짜 모두에서 같은 연도 사용
    const year = startParts[2];

    // startDate를 'YYYY-MM-DD' 형식으로 변환
    const startDate = `${year}-${startParts[0].padStart(2, '0')}-${startParts[1].padStart(2, '0')}`;

    // endDate를 'YYYY-MM-DD' 형식으로 변환
    const endDate = `${endParts[2]}-${endParts[0].padStart(2, '0')}-${endParts[1].padStart(2, '0')}`;

    return { startDate, endDate };
  };

  const handleDatePicker = (dateString?: string) => {
    setSelectedDateStr(dateString!);
  };

  const handleSearch = () => {
    const { startDate, endDate } = selectedDateStr
      ? parseDateRange(selectedDateStr)
      : { startDate: '', endDate: '' };

    if (
      processCode &&
      processCode[0] !== '' &&
      startDate !== '' &&
      endDate !== ''
    ) {
      fetchWorkInstructionData([processCode[0], startDate, endDate]); // fetchData 함수 호출
    }
  };

  useEffect(() => {
    setSelectedDateStr(null);
  }, [processCode]);

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
      <div className={styles.datepicker}>
        <DatePicker
          onChange={handleDatePicker}
          dateRangeString={selectedDateStr}
        />
      </div>
      <Button text="조회" onClick={handleSearch} />
    </div>
  );
};

export default FilterContainer;
