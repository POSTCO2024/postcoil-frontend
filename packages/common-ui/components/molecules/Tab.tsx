import { Tabs } from 'antd';
import React from 'react';
import './Tab.module.scss';

// info
// props: Tabs 안에 들어갈 텍스트와 발생 이벤트를 input 값으로 전달
// ex) labels = ['에러재","대상재"];
// <Tab onChange={onChange} labels={labels} />

// props type
interface TabsProps {
  labels: string[]; // Tabs에 표시될 텍스트 배열
  onChange?: (key?: string) => void;
}

//Tabs change event handler
// const onChange = (key: string) => {
//   console.log(key);
// };

export const Tab: React.FC<TabsProps> = ({ labels, onChange }) => {
  return (
    <div>
      <Tabs
        onChange={
          onChange
            ? onChange
            : () => {
                console.log('Tab Click');
              }
        }
        type="card"
        items={labels.map((label, i) => {
          const id = String(i + 1);
          return {
            label: label,
            key: id,
          };
        })}
      />
    </div>
  );
};

export default Tab;
