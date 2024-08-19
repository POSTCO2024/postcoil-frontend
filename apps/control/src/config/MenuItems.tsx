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
        label: '공장별 수급량 관리',
        children: [
          { key: '14', label: <Link to="/control3">저장위치별 수급량</Link> },
          { key: '15', label: <Link to="/control4">공정별 모니터링</Link> },
        ],
      },
      { key: '16', label: <Link to="/control5">공정별 작업대상재 분석</Link> },
    ],
  },
  {
    key: '2',
    icon: <AppstoreOutlined />,
    label: '작업 스케줄 편성',
    children: [
      { key: '21', label: <Link to="/schedule1">Schedule 편성</Link> },
      { key: '22', label: 'Schedule 편성관리' },
      { key: '23', label: 'Schedule 이력관리' },
    ],
  },
  {
    key: '3',
    icon: <SettingOutlined />,
    label: '기준 관리',
    children: [
      { key: '31', label: <Link to="/manage1">대상재 추출기준 관리</Link> },
      { key: '32', label: <Link to="/manage2">스케줄 기준관리 </Link> },
    ],
  },
];
