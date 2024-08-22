import { Button } from '@postcoil/ui';
import { Input, Form } from 'antd';
import { useState } from 'react';

import styles from './Result.module.scss';

import CommonModal from '@/components/common/CommonModal';
interface PropsType {
  title: string;
  data: any;
}

const Result = ({ title, data }: PropsType) => {
  const [form] = Form.useForm();
  const [modalTitle, setModalTitle] = useState('');
  // const [isEditing, setIsEditing] = useState(false); // FIXME: check Remove this
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModalEditing = () => {
    setModalTitle(title + ' 수정하기');
    // setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleApply = () => {
    // TODO: save data to server
    // form.submit();
    console.log('Success:');
    setIsModalOpen(false);
  };

  // TODO: 조회 common 컴포넌트꺼 사용! - 롤편성조회 화면 지우기

  const onFinish = (values: any) => {
    console.log('Success:', values);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.resultBtns}>
      <Button text={'수정'} onClick={showModalEditing} />
      <CommonModal
        title={modalTitle}
        isModalOpen={isModalOpen}
        onCancel={handleCancel}
        onApply={handleApply}>
        <Form
          form={form}
          name={modalTitle}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 8,
          }}
          style={{
            maxWidth: 300,
          }}
          onFinish={onFinish}
          autoComplete="off">
          {data.map((item: any) => {
            return (
              <div key={item.key}>
                <p style={{ fontWeight: 'bold' }}>{item.columnName}</p>
                <Form.Item name={item.columnName}>
                  <Input
                    type="text"
                    addonAfter={item.columnName == '소둔온도' ? '°C' : 'mm'}
                  />
                </Form.Item>
              </div>
            );
          })}
        </Form>
      </CommonModal>
    </div>
  );
};

export default Result;
