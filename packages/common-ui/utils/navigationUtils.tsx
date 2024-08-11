import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';

export interface NavigationProps {
  logo: string;
  human: string;
}

export interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

type MenuItem = Required<MenuProps>['items'][number];

export const items: MenuItem[] = [
  {
    key: '1',
    icon: <MailOutlined />,
    label: '작업 대상재 편성',
    children: [
      { key: '11', label: <Link to="/button1">공정별 작업 대상재 관리</Link> },
      { key: '12', label: <Link to="/button2">공정별 에러재 관리</Link> },
      { key: '13', label: '공장별 수급량 관리' },
      { key: '14', label: '공장별 작업대상재 분석' },
    ],
  },
  {
    key: '2',
    icon: <AppstoreOutlined />,
    label: '작업 스케줄 편성',
    children: [
      { key: '21', label: 'Schedule 편성' },
      { key: '22', label: 'Schedule 편성관리' },
      { key: '23', label: 'Schedule 이력관리' },
    ],
  },
  {
    key: '3',
    icon: <SettingOutlined />,
    label: '기준 관리',
    children: [
      { key: '31', label: '대상재 추출기준 관리' },
      { key: '32', label: '스케줄 기준관리' },
    ],
  },
];

export const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
