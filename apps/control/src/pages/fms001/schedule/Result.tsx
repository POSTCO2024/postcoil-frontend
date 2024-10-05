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
    console.log('Success - 보내기');
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.result}>
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
                <p style={{ fontWeight: '600' }}>{item.column}</p>
                <Form.Item name={item.column}>
                  <Input
                    type="number"
                    addonAfter={item.value ? 'mm' : '순위'}
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
