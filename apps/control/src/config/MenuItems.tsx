import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

export const MenuItems: MenuItem[] = [
  {
    key: '1',
    icon: <MailOutlined />,
    label: '작업 대상재 편성',
    children: [
      { key: '11', label: <Link to="/control1">공정별 작업 대상재 관리</Link> },
      { key: '12', label: <Link to="/control2">공정별 에러재 관리</Link> },
      {
        key: '13',
        label: <Link to="/control3">공장별 수급량 관리</Link>,
      },
      {
        key: '14',
        label: '공정별 작업대상재 분석',
        children: [
          { key: '140', label: <Link to="/control4/1PCM">1PCM</Link> },
          { key: '141', label: <Link to="/control4/1CAL">1CAL</Link> },
          { key: '142', label: <Link to="/control4/1EGL">1EGL</Link> },
          { key: '143', label: <Link to="/control4/1CGL">1CGL</Link> },
          { key: '144', label: <Link to="/control4/2PCM">2PCM</Link> },
          { key: '145', label: <Link to="/control4/2CAL">2CAL</Link> },
          { key: '146', label: <Link to="/control4/2EGL">2EGL</Link> },
          { key: '147', label: <Link to="/control4/2CGL">2CGL</Link> },
        ],
      },
    ],
  },
  {
    key: '2',
    icon: <AppstoreOutlined />,
    label: '작업 스케줄 편성',
    children: [
      { key: '21', label: <Link to="/schedule1">Schedule 편성</Link> },
      { key: '22', label: <Link to="/schedule2">Schedule 편성관리</Link> },
      { key: '23', label: <Link to="/schedule3">Schedule 결과</Link> },
      { key: '24', label: <Link to="/schedule4">Schedule 이력</Link> },
    ],
  },
  {
    key: '3',
    icon: <SettingOutlined />,
    label: '기준 관리',
    children: [
      { key: '31', label: <Link to="/manage1">추출기준 관리</Link> },
      { key: '32', label: <Link to="/manage2">에러기준 관리</Link> },
      { key: '33', label: <Link to="/manage3">스케줄기준 관리 </Link> },
    ],
  },
];

export const mappingKeys = [
  { key: '11', path: '/' },
  { key: '11', path: '/control1' },
  { key: '12', path: '/control2' },
  { key: '13', path: '/control3' },
  { key: '14', path: '/control4' },
  { key: '21', path: '/schedule1' },
  { key: '22', path: '/schedule2' },
  { key: '23', path: '/schedule3' },
  { key: '24', path: '/schedule4' },
  { key: '31', path: '/manage1' },
  { key: '32', path: '/manage2' },
  { key: '33', path: '/manage3' },
  { key: '140', path: '/control4/1PCM' },
  { key: '141', path: '/control4/1CAL' },
  { key: '142', path: '/control4/1EGL' },
  { key: '143', path: '/control4/1CGL' },
  { key: '144', path: '/control4/2PCM' },
  { key: '145', path: '/control4/2CAL' },
  { key: '146', path: '/control4/2EGL' },
  { key: '147', path: '/control4/2CGL' },
];
