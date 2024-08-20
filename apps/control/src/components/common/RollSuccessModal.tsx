import { CheckCircleFilled } from '@ant-design/icons';

import CommonModal from './CommonModal';

interface PropsType {
  isModalOpen: boolean;
  handleCancel: () => void;
  handleApply: () => void;
  title?: string | null;
}

const RollSuccessModal = ({
  isModalOpen,
  handleCancel,
  handleApply,
  title,
}: PropsType) => {
  return (
    <CommonModal
      isModalOpen={isModalOpen}
      isConfirmation={true}
      onCancel={handleCancel}
      onApply={handleApply}>
      <CheckCircleFilled style={{ fontSize: '4rem', color: '#1677FF' }} />
      <p style={{ fontSize: '1.5rem', textAlign: 'center', marginTop: '10px' }}>
        {title}
      </p>
    </CommonModal>
  );
};

export default RollSuccessModal;
