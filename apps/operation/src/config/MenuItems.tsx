import { MailOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

export const MenuItems: MenuItem[] = [
  {
    key: '4',
    icon: <MailOutlined />,
    label: <Link to="operation1">작업 지시 전문</Link>,
  },
  {
    key: '5',
    icon: <FundProjectionScreenOutlined />,
    label: <Link to="operation2">작업 화면</Link>,
  },
  {
    key: '6',
    icon: <FundProjectionScreenOutlined />,
    label: <Link to="operation3">시뮬레이션</Link>,
  },
];

export const mappingKeys = [
  { key: '4', path: '/' },
  { key: '4', path: '/operation1' },
  { key: '5', path: '/operation2' },
  { key: '6', path: '/operation3' },
];
