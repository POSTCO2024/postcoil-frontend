import { CheckCircleFilled } from '@ant-design/icons';

import CommonModal from '@/components/common/CommonModal';

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
      <CheckCircleFilled style={{ fontSize: '4rem', color: '#1677FF' }} />
      <p style={{ fontSize: '1.5rem', textAlign: 'center', marginTop: '10px' }}>
        스케줄이 편성되었습니다.
      </p>
    </CommonModal>
  );
};

export default RollSuccessModal;
