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
import { Table } from '@postcoil/ui';
import { ColumnDataType } from '@postcoil/ui/config/TableConfig';
import { Button, ConfigProvider } from 'antd';
import React, { useState, useContext, useMemo, useEffect } from 'react';

import styles from './ContentContainer.module.scss';

import { MaterialDataType } from '@/config/scheduling/contentConfig';
import { MaterialDTO } from '@/config/scheduling/dto';
import { useMaterialStore } from '@/store/fs002store';
import {
  materialColumnData,
  transformedData,
} from '@/utils/scheduling/TableUtils';

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const dragColumns: ColumnDataType<MaterialDataType>[] = [
  {
    key: 'sort',
    align: 'center',
    width: 80,
    title: '',
    dataIndex: 'dragHandle',
    render: () => <DragHandle />,
  },
  ...materialColumnData,
];

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

const ContentContainer = () => {
  const materialData = useMaterialStore((state) => state.data as MaterialDTO[]);
  const updateData = useMaterialStore((state) => state.updateData!);

  const [dataSource, setDataSource] = useState<MaterialDataType[]>([]);

  // materialData가 변경될 때마다 dataSource 업데이트 및 재렌더링
  useEffect(() => {
    if (materialData && materialData.length > 0) {
      const transformed = transformedData(materialData);
      setDataSource(transformed);
    } else {
      setDataSource([]);
    }
    console.log('Material', materialData);
    console.log('Updated dataSource:', dataSource);
  }, [materialData]); // materialData가 변경될 때마다 실행

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex(
          (record) => record.key === active?.id,
        );
        const overIndex = prevState.findIndex(
          (record) => record.key === over?.id,
        );
        const newData = arrayMove(prevState, activeIndex, overIndex);

        // 드래그된 항목에 대해 changed 값을 true로 설정
        const updatedData = newData.map((record) =>
          record.key === active?.id ? { ...record, changed: true } : record,
        );

        updateData(updatedData);
        return updatedData;
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
              items={dataSource.map((i) => i.key!)}
              strategy={verticalListSortingStrategy}>
              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      rowHoverBg: '#eff4ff',
                    },
                  },
                }}>
                <Table
                  rowKey="key"
                  components={{ body: { row: Row } }}
                  columns={dragColumns}
                  data={dataSource}
                  rowClassName={(record) =>
                    record.changed ? `${styles.changedBg}` : ''
                  }
                />
              </ConfigProvider>
            </SortableContext>
          </DndContext>
        </div>
      </section>
    </div>
  );
};

export default ContentContainer;
