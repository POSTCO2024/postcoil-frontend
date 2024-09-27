export interface Fc002DataType {
  key: string;
  id: string;
  no: string;
  f_code: string;
  type: string;
  op_code: string;
  status: string;
  curr_proc: string;
  progress: string;
  thickness: number;
  width: number;
  outer: number;
  inner: number;
  weight: number;
  total_weight: number;
  length: number;
  pass_proc: string;
  rem_proc: string;
  pre_proc: string;
  next_proc: string;
  storage_loc: string;
  yard: string;
  coil_type_code: string;
  order_no: string;
  error_code: string;
  error_reason: string;
  customer_name: string;
  quantity: number;
  due_date: string; // 날짜를 다룰 때는 Date 객체를 사용하고 싶다면 Date로 변경 가능
  order_date: string; // 마찬가지로 Date로 변경 가능
  remarks: string | null;
}
