import { DataType } from '@postcoil/ui/config/TableConfig';

import { PriorityDTO, ConstraintInsertionDTO } from '@/config/management/dto';

export interface TransformedPriorityDataType extends DataType {
  key: string;
  id: string;
  priorityOrder: string;
  column: string;
}

export interface TransformedConstraintDataType extends DataType {
  key: string;
  id: string;
  column: string;
  value: string | number;
}

export const transformedData = (
  data: PriorityDTO[] | ConstraintInsertionDTO[],
): TransformedPriorityDataType[] | TransformedConstraintDataType[] => {
  if (isPriorityDTOArray(data)) {
    return (data as PriorityDTO[]).map((p) => ({
      key: p.id.toString(),
      id: p.id.toString(),
      priorityOrder: p.priorityOrder.toString(),
      column: p.name,
    }));
  } else {
    return (data as ConstraintInsertionDTO[]).map((c) => ({
      key: c.id.toString(),
      id: c.id.toString(),
      column: c.targetColumn,
      value: c.targetValue,
    }));
  }
};

function isPriorityDTOArray(
  data: PriorityDTO[] | ConstraintInsertionDTO[],
): data is PriorityDTO[] {
  return (data as PriorityDTO[])[0]?.priorityOrder !== undefined;
}
