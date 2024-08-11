import { CheckCircleFilled } from '@ant-design/icons';
import React from 'react';

import CommonModal from '../../../components/common/CommonModal';

interface PropsType {
  isModalOpen: boolean;
  handleCancel: () => void;
  handleApply: () => void;
}

const RollSuccessModal = ({
  isModalOpen,
  handleCancel,
  handleApply,
}: PropsType) => {
  return (
    <CommonModal
      isModalOpen={isModalOpen}
      isConfirmation={true}
      onCancel={handleCancel}
      onApply={handleApply}>
      <CheckCircleFilled style={{ fontSize: '3rem', color: '#4763E4' }} />
      <p style={{ fontSize: '1.1rem', textAlign: 'center' }}>
        롤 단위가 편성되었습니다.
      </p>
    </CommonModal>
  );
};

export default RollSuccessModal;
