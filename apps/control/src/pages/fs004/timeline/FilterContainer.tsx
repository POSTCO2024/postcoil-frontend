import { Button, DatePicker, Dropdown } from '@postcoil/ui';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import styles from './FilterContainer.module.scss';

import { useWorkInstructionStore } from '@/store/fs004store';
import { options } from '@/utils/scheduling/dropdownUtils';

const FilterContainer = () => {
  const fetchWorkInstructionData = useWorkInstructionStore(
    (state) => state.fetchData!,
  );
  const cleanData = useWorkInstructionStore((state) => state.cleanData!);

  const [processCode, setProcessCode] = useState<string[]>(['1CAL']);
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>('');

  const handleProcessCode = (value?: string[]) => {
    if (value && value[0]) {
      setProcessCode(value);
      useWorkInstructionStore.setState({ processCode: value[0] });
    } else {
      setProcessCode([]);
      useWorkInstructionStore.setState({ processCode: '' });
    }
    setSelectedDateStr(''); // 날짜 선택 초기화
    cleanData(); // 데이터 정리
  };

  // 날짜 범위 파싱
  const parseDateRange = (dateRangeStr: string) => {
    const [startDateStr, endDateStr] = dateRangeStr.split(' - ');

    // 각각의 날짜가 유효한지 체크
    if (!startDateStr || !endDateStr) {
      throw new Error('Invalid date range');
    }

    const [startMonth, startDay, startYear] = startDateStr.split('/');
    const [endMonth, endDay, endYear] = endDateStr.split('/');

    // 각 요소가 존재하는지 확인하고 padStart 사용
    const safeStartMonth = startMonth?.padStart(2, '0');
    const safeStartDay = startDay?.padStart(2, '0');
    const safeEndMonth = endMonth?.padStart(2, '0');
    const safeEndDay = endDay?.padStart(2, '0');

    return {
      startDate: `${startYear}-${safeStartMonth}-${safeStartDay}`,
      endDate: `${endYear}-${safeEndMonth}-${safeEndDay}`,
    };
  };

  // 날짜 선택 핸들러
  const handleDatePicker = (dateString?: string) => {
    console.log(dateString);
    if (dateString) {
      setSelectedDateStr(dateString);
    } else {
      setSelectedDateStr(''); // 비어 있을 경우
    }
  };

  // 조회 버튼 핸들러
  const handleSearch = () => {
    if (processCode[0] && selectedDateStr) {
      const { startDate, endDate } = parseDateRange(selectedDateStr);
      fetchWorkInstructionData([processCode[0], startDate, endDate]);
    }
  };

  useEffect(() => {
    // 오늘 날짜와 2일 전 날짜 계산
    const today = dayjs(); // 오늘 날짜
    const endDate = today.format('YYYY-MM-DD'); // 오늘 날짜를 'YYYY-MM-DD' 형식으로 변환
    const startDate = today.subtract(2, 'day').format('YYYY-MM-DD'); // 2일 전 날짜를 'YYYY-MM-DD' 형식으로 변환

    // 기본 값 설정
    setSelectedDateStr(`${startDate} - ${endDate}`); // 날짜 범위 설정
    useWorkInstructionStore.setState({ processCode: '1CAL' }); // 기본 공정명 설정
    fetchWorkInstructionData([processCode[0], startDate, endDate]); // fetchData 함수 호출
  }, []); // 컴포넌트가 처음 렌더링될 때 실행

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
