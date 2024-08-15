import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

export const MenuItems: MenuItem[] = [
  {
    key: '4',
    icon: <MailOutlined />,
    label: '재료진행상태관리',
    children: [
      {
        key: '41',
        label: <Link to="/operation1">공정별 작업 대상재 관리</Link>,
      },
      { key: '42', label: <Link to="/operation2">공정별 에러재 관리</Link> },
    ],
  },
  {
    key: '5',
    icon: <AppstoreOutlined />,
    label: '감성',
    children: [
      { key: '51', label: '미정' },
      { key: '52', label: '미정' },
      { key: '53', label: '미정' },
    ],
  },
];
