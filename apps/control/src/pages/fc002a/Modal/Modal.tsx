import React, { useState } from 'react';
import { Modal as AntModal } from 'antd';
import { Button } from '@postcoil/ui';

const Modal: React.FC<{}> = () => {
  // Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="modalContainer">
      <Button text="에러패스" onClick={showModal} />
      <AntModal
        title="Error Pass"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>에러패스를 적용하시겠습니까?</p>
      </AntModal>
    </div>
  );
};

export default Modal;
