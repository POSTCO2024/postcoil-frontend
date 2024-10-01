import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import React from 'react';

interface SearchBottonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SearchButton: React.FC<SearchBottonProps> = ({ onClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 기본 동작을 막음
    onClick(e); // 클릭 이벤트 처리
  };

  return (
    <div className="searchbuttonContainer">
      <Flex wrap gap="small">
        <Button icon={<SearchOutlined />} href="" onClick={handleClick} />
      </Flex>
    </div>
  );
};

export default SearchButton;
