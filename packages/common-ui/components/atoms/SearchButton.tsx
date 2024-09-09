import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';

export const SearchButton: React.FC = () => {
  return (
    <div className="searchbuttonContainer">
      <Flex wrap gap="small">
        <Button icon={<SearchOutlined />} href="" />
      </Flex>
    </div>
  );
};

export default SearchButton;
