import { CloseCircleOutlined } from '@ant-design/icons';

import CommonModal from './CommonModal';

interface PropsType {
  isModalOpen: boolean;
  handleCancel: () => void;
  handleApply: () => void;
  title?: string | null;
}

const RollFailModal = ({
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
      <CloseCircleOutlined
        style={{
          fontSize: '4rem',
          display: 'block',
          color: 'red',
        }}
      />
      <p style={{ fontSize: '1.5rem', textAlign: 'center', marginTop: '20px' }}>
        {title}
      </p>
    </CommonModal>
  );
};

export default RollFailModal;
