export interface dropDownOptionType {
  value: string;
  // label을 ReactNode로 지정하여 jsx형식 return이 가능케함
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface OptionType {
  value: string;
  label: string;
  icon?: React.ReactNode;
}
