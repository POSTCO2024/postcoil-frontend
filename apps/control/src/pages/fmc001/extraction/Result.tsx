import { Button } from '@postcoil/ui';
import { Input, Form } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';

import styles from './Result.module.scss';

import CommonModal from '@/components/common/CommonModal';
import { keyMapping } from '@/config/management/extMConfig';

const controlApiUrl = import.meta.env.VITE_CONTROL_API_URL;

interface PropsType {
  title: string;
  data: any;
  facility: string;
  setPostedData: any;
}

function transformData(data: any) {
  const transformedData: { [key: string]: any } = {};
  // 원본 객체의 각 키를 매핑된 새로운 키로 변환
  Object.keys(data).forEach((key) => {
    const newKey = keyMapping[key]; // 매핑된 새로운 키
    if (newKey) {
      transformedData[newKey] = data[key]; // 새로운 키에 값을 할당
    }
  });
  return transformedData;
}

// modal을 수정하고 부모의 setStandardDatas 에 맞는 형태로 바꿔주는 함수
function updateValues(dataArray: any, newValues: any) {
  return dataArray.map((item: any) => {
    // 새로운 값을 찾기
    const newValue = newValues[item.columnName];
    return {
      ...item, // 기존 속성을 그대로 복사
      value: newValue !== undefined ? newValue : item.value, // 새로운 값이 있으면 업데이트, 없으면 기존 값 유지
    };
  });
}

const Result = ({ title, data, facility, setPostedData }: PropsType) => {
  const postStandard = async (data: any) => {
    await axios
      .post(controlApiUrl + '/api/v1/management/extraction/' + facility, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
    form
      .validateFields()
      .then((values) => {
        onFinish(values); // Call onFinish with the form values
        setIsModalOpen(false); // Close the modal after applying changes
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  // TODO: 조회 common 컴포넌트꺼 사용! - 롤편성조회 화면 지우기
  // 모달창의 수정 버튼을 눌렀을 때 이벤트
  const onFinish = (values: any) => {
    // 수정된 값
    console.log('Success:', values);
    // 백엔드 데이터베이스에 맞춰 매핑
    console.log(transformData(values));
    postStandard(transformData(values));
    setPostedData(updateValues(data, values));
    setIsModalOpen(false);
  };

  // 각 버튼 누를때마다 모달 안의 내용이 바뀌게 만듬
  useEffect(() => {
    form.setFieldsValue(
      data.reduce((acc: any, item: any) => {
        acc[item.columnName] = item.value;
        return acc;
      }, {}),
    );
  }, [data, form]);

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
                    style={{ marginTop: '10%' }}
                    type="text"
                    addonAfter={item.columnName == '소둔온도' ? '°C' : ''}
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
