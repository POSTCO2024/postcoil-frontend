import { Checkbox, Form } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { scheduleApiClient, scheduleBaseUrl } from '@/api/scheduleApi';
import CommonModal from '@/components/common/CommonModal';
import RollSuccessModal from '@/components/common/RollSuccessModal';
import { ScheduleInfoDTO, WorkInstructionsDTO } from '@/config/scheduling/dto';
import { useMaterialStore, useScheduleStore } from '@/store/fs002store';

interface PropsType {
  isModalOpen: boolean;
  onCancel: () => void;
  onApply: () => void;
  title?: string | null;
}

const SchListModal = ({ isModalOpen, onApply, onCancel }: PropsType) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const scheduleData = useScheduleStore(
    (state) => state.data as ScheduleInfoDTO[],
  );
  const processCode = useScheduleStore((state) => state.processCode);
  // const cleanScheduleData = useScheduleStore((state) => state.cleanData); // cleanData 함수 추가

  const data = scheduleData
    ? scheduleData!.map((d: { id: string; scheduleNo: string }) => ({
        value: d.id,
        label: d.scheduleNo,
      }))
    : undefined;

  const [isModal2Open, setIsModal2Open] = useState(false);

  const onSubmit = () => {
    form.submit(); // 적용버튼 누를시 form 제출!
  };
  const handleCancel = () => {
    setIsModal2Open(false);
    navigate('/schedule3');
  };

  const createConfirmDTO = (values: any) => {
    // 체크된 planId를 필터링
    const checkedPlanIds = Object.keys(values).filter((key) => values[key]);

    // Material 데이터를 관리하는 store에서 cache와 originalCache를 가져옴
    const cache = useMaterialStore.getState().cache!;
    const originalCache = useMaterialStore.getState().originalCache!;

    // checkedPlanIds에 맞는 updateMaterials를 생성
    const confirmPlans = checkedPlanIds.map((planId) => {
      // cache와 originalCache에서 해당 planId에 맞는 데이터 가져오기
      const currentMaterials = cache[planId] || [];
      const originalMaterials = originalCache[planId] || [];

      // sequence가 변경된 material 찾기
      const updateMaterials = currentMaterials
        .filter((currentMaterial) => {
          const originalMaterial = originalMaterials.find(
            (original) => original.id === currentMaterial.id,
          );
          return (
            originalMaterial &&
            originalMaterial.sequence !== currentMaterial.sequence
          );
        })
        .map((material) => ({
          materialId: material.id,
          sequence: material.sequence,
        }));

      return {
        planId: Number(planId),
        confirmBy: 'PostcoTEAM1', // confirmBy는 고정값
        updateMaterials: updateMaterials, // 변경된 material을 추가
      };
    });
    return confirmPlans;
  };

  const onFinish = async (values: any) => {
    const checkedPlanIds = Object.keys(values).filter((key) => values[key]);

    // confirmPlans 형식의 requestBody 생성
    const confirmPlans = createConfirmDTO(values);

    try {
      await scheduleApiClient
        .post(`${scheduleBaseUrl}/confirm`, confirmPlans, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          // 응답 상태가 200이고, result 배열의 길이가 1 이상인 경우
          if (response.data.status === 200 && response.data.result.length > 0) {
            // planId 배열을 추출하여 쿼리 파라미터 형식으로 변환
            const planIds = response.data.result.map(
              (item: ScheduleInfoDTO) => item.id,
            );
            const queryParams = planIds
              .map((id: string) => `planIds=${id}`)
              .join('&');

            // /confirm/sendKafka로 GET 요청
            scheduleApiClient
              .post(`${scheduleBaseUrl}/confirm/sendKafka?${queryParams}`)
              .then((kafkaResponse) => {
                console.log('Kafka response:', kafkaResponse.data);
              })
              .catch((error) => {
                console.error('Error sending to Kafka:', error);
              });
          }

          // 요청이 성공하면 해당 planId에 해당하는 데이터 cache에서 삭제
          useMaterialStore.setState((state) => {
            const updatedCache = { ...state.cache };
            const updatedOriginalCache = { ...state.originalCache };

            // checkedPlanIds에 해당하는 값을 삭제
            checkedPlanIds.forEach((planId) => {
              delete updatedCache[planId];
              delete updatedOriginalCache[planId];
            });

            return {
              cache: updatedCache,
              originalCache: updatedOriginalCache,
            };
          });
        }); // 결과 console에서 보려고

      // 폼이 성공적으로 제출되었으니 2번째 모달 열기
      onApply();
      setIsModal2Open(true);
    } catch (error) {
      console.log('Submission error:', error);
    }
  };

  return (
    <>
      <CommonModal
        title={`등록할 스케줄 리스트 (${processCode})`}
        isModalOpen={isModalOpen}
        isConfirmation={false}
        width={370}
        style={{ textAlign: 'center' }}
        onApply={onSubmit}
        onCancel={onCancel}>
        <Form
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 8,
          }}
          style={{
            width: 'fit-content',
            maxWidth: 300,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 20,
            marginBottom: 50,
          }}
          onFinish={onFinish}
          autoComplete="off">
          {data &&
            data.map((item: { value: string; label: string }) => (
              <Form.Item
                key={item.value}
                name={item.value}
                valuePropName="checked"
                style={{ height: '1rem' }}>
                <Checkbox style={{ height: 'fit-content', padding: 0 }}>
                  {item.label}
                </Checkbox>
              </Form.Item>
            ))}
        </Form>
      </CommonModal>
      <RollSuccessModal
        isModalOpen={isModal2Open}
        handleApply={handleCancel}
        handleCancel={handleCancel}
        title="스케줄이 정상적으로 등록되었습니다."
      />
    </>
  );
};

export default SchListModal;
