import { ClockCircleOutlined, RedoOutlined } from '@ant-design/icons';

import { dropDownOptionType } from '@/config/scheduling/dropdownConfig';

export const mockRollUnitName: dropDownOptionType[] = [
  {
    value: '1CAL001A',
    label: (
      <div>
        {/* 아이콘추가 부분 */}
        <RedoOutlined spin style={{ color: '#1677ff' }} />
        <span style={{ marginLeft: 10 }}>{'1CAL001A'}</span>
      </div>
    ),
    icon: <RedoOutlined />,
  },
  {
    value: '1CAL001B',
    label: (
      <div>
        <ClockCircleOutlined style={{ color: '#1677ff' }} />
        <span style={{ marginLeft: 10 }}>{'1CAL001B'}</span>
      </div>
    ),
    icon: <ClockCircleOutlined />,
  },
  {
    value: '1CAL002A',
    label: (
      <div>
        <ClockCircleOutlined style={{ color: '#1677ff' }} />
        <span style={{ marginLeft: 10 }}>{'1CAL002A'}</span>
      </div>
    ),
    icon: <ClockCircleOutlined />,
  },
  {
    value: '1CAL002B',
    label: (
      <div>
        <ClockCircleOutlined style={{ color: '#1677ff' }} />
        <span style={{ marginLeft: 10 }}>{'1CAL002B'}</span>
      </div>
    ),
    icon: <ClockCircleOutlined />,
  },
  {
    value: '1CAL003B',
    label: (
      <div>
        <ClockCircleOutlined style={{ color: '#1677ff' }} />
        <span style={{ marginLeft: 10 }}>{'1CAL003B'}</span>
      </div>
    ),
    icon: <ClockCircleOutlined />,
  },
  // Add more options...
];
