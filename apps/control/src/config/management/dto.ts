export interface PriorityDTO {
  id: number | string;
  name: string;
  priorityOrder: number | string;
  applyMethod: 'DESC' | 'GROUPING' | 'ASC' | 'CONSTRAINT' | 'ETC';
  targetColumn: string;
}

export interface ConstraintInsertionDTO {
  id: number | string;
  type: 'CONSTRAINT' | 'INSERTION';
  targetColumn: 'width' | 'thickness' | string;
  targetValue: string | number;
}
