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
    label: '작업 화면',
    children: [
      { key: '51', label: <Link to="/operation2_1CAL">1CAL</Link> },
      { key: '52', label: <Link to="/operation2_2CAL">2CAL</Link> },
    ],
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
  { key: '51', path: '/operation2_1CAL' },
  { key: '52', path: '/operation2_2CAL' },
  { key: '6', path: '/operation3' },
];
