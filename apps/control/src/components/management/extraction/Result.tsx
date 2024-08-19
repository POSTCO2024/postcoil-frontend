import { Button, Table, Input, Form } from 'antd';
import { useState } from 'react';

import styles from './Result.module.scss';

import CommonModal from '@/components/common/CommonModal';
import { DataType } from '@/pages/management/extraction/ExtMPage';
interface PropsType {
  title: string;
  data: DataType;
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
    form.setFieldsValue(data); // 폼에 초기값 설정
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
  // fetch data 후 values 수정
  const onFinish = (values: string[] | null) => {
    console.log('Success:', values);
    setIsModalOpen(false);
  };

  // For Table
  // columns 설정
  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
    },
    {
      title: 'Value',
      dataIndex: 'value',
    },
  ];

  // dataSource로 변환
  const dataSource = Object.keys(data).map((key) => ({
    key: key,
    value: title == '에러기준' ? data[key] + '%' : data[key],
  }));

  return (
    <div className={styles.result}>
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
          {Object.keys(data).map((key) => {
            return (
              <div key={key}>
                <p style={{ fontWeight: 'bold' }}>{key}</p>
                <Form.Item name={key.trim()}>
                  <Input
                    type="text"
                    addonAfter={title == '에러기준' ? '%' : ''}
                  />
                </Form.Item>
              </div>
            );
          })}
        </Form>
      </CommonModal>
      <p>{title}</p>
      <Table
        style={{ borderRadius: '5px' }}
        pagination={false}
        columns={columns}
        dataSource={dataSource}
      />
      <div className={styles.resultBtns}>
        <Button onClick={showModalEditing}>수정</Button>
      </div>
    </div>
  );
};

export default Result;
