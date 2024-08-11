import { Button as AntButton } from 'antd';
import React from 'react';
import './Button.scss';

// info
// props: 버튼 안의 텍스트와 버튼 클릭 시 발생 이벤트 함수를 전달
// ex) <Button text={ButtonText} onClick={showModal}>

// props type
interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <div className="button-container">
      <AntButton className="button" type="primary" onClick={onClick}>
        {' '}
        {text}{' '}
      </AntButton>
    </div>
  );
};

export default Button;
