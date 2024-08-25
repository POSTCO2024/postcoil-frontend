import { Checkbox, Form } from 'antd';
import { useState } from 'react';

import CommonModal from '@/components/common/CommonModal';
import RollSuccessModal from '@/components/common/RollSuccessModal';

interface PropsType {
  isModalOpen: boolean;
  onCancel: () => void;
  onApply: () => void;
  title?: string | null;
}

const SchListModal = ({ isModalOpen, onApply, onCancel }: PropsType) => {
  const [form] = Form.useForm();
  const [isModal2Open, setIsModal2Open] = useState(false);
  const handleModal2 = () => {
    setIsModal2Open(true);
  };
  const handleCancel = () => {
    setIsModal2Open(false);
    onCancel();
  };
  const handleApply = () => {
    setIsModal2Open(false);
    onApply();
  };

  // TODO: 조회 common 컴포넌트꺼 사용! - 롤편성조회 화면 지우기
  // fetch data 후 values 수정
  const onFinish = (values: string[] | null) => {
    console.log('Success:', values);
  };

  const data = [
    { value: '1CAL001A', label: '1CAL001A' },
    { value: '1CAL001B', label: '1CAL001B' },
  ];

  return (
    <>
      <CommonModal
        title="등록할 스케줄 리스트"
        isModalOpen={isModalOpen}
        isConfirmation={false}
        onApply={handleModal2}
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
          }}
          onFinish={onFinish}
          autoComplete="off">
          {data.map((item) => (
            <Form.Item
              key={item.value}
              name={item.value.trim()}
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
        handleApply={handleApply}
        handleCancel={handleCancel}
        title="스케줄이 정상적으로 등록되었습니다."
      />
    </>
  );
};

export default SchListModal;
