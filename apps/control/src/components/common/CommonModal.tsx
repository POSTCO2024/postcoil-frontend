import { Modal, Button } from 'antd';
import React from 'react';
import './CommonModal.scss';

interface PropsType {
  title?: string;
  isModalOpen: boolean;
  isConfirmation?: boolean;
  isButtonNeeded?: boolean;
  width?: number | undefined; // Modal width
  style?: React.CSSProperties | undefined; // Modal style
  onCancel: () => void;
  onApply?: () => void;
  children: React.ReactNode;
}

const CommonModal = ({
  title,
  isModalOpen,
  isConfirmation = false,
  isButtonNeeded = true,
  width,
  style,
  onCancel,
  onApply,
  children,
}: PropsType) => {
  return (
    <Modal
      className="modal"
      title={title}
      open={isModalOpen}
      onCancel={onCancel}
      width={width}
      style={style}
      footer={
        isButtonNeeded && (
          <div className="modal-btns">
            <Button className="apply-btn" onClick={onApply}>
              {isConfirmation ? '확인' : '적용'}
            </Button>
            {!isConfirmation && <Button onClick={onCancel}>취소</Button>}
          </div>
        )
      }>
      {children}
    </Modal>
  );
};

export default CommonModal;
