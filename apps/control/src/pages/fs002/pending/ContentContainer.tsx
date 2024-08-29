import { HolderOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Table } from 'antd';
import { Button } from 'antd';
import React, { useContext, useMemo } from 'react';

import styles from './ContentContainer.module.scss';

import { MaterialDataType } from '@/config/scheduling/ContentConfig';
import { ColumnDataType } from '@/config/scheduling/TableConfig';
import { mockcolumns, mockdata } from '@/utils/scheduling/MaterialTableUtils';
// interface PropsType{
//   data?: TODO: props로 데이터 받기
// }

const dragColumns: ColumnDataType<MaterialDataType>[] = [
  {
    key: 'sort',
    align: 'center',
    width: 80,
    render: () => <DragHandle />,
  },
  ...mockcolumns,
];

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = React.createContext<RowContextProps>({});

export const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: 'move' }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

const Row: React.FC<RowProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props['data-row-key'] });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners],
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const ContentContainer = () => {
  const [dataSource, setDataSource] =
    React.useState<MaterialDataType[]>(mockdata);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex(
          (record) => record.key === active?.id,
        );
        const overIndex = prevState.findIndex(
          (record) => record.key === over?.id,
        );
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

  return (
    <div className={styles.contentContainer}>
      <section className={styles.tableWrapper}>
        <div className={styles.table}>
          <DndContext
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={onDragEnd}>
            <SortableContext
              items={dataSource.map((i) => i.key)}
              strategy={verticalListSortingStrategy}>
              <Table
                rowKey="key"
                components={{ body: { row: Row } }}
                columns={dragColumns}
                dataSource={dataSource}
              />
            </SortableContext>
          </DndContext>
        </div>
      </section>
    </div>
  );
};

export default ContentContainer;
