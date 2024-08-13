interface OptionType {
  value: string;
  label: string;
}

// Cascader value
export const optionsDropdown: OptionType[] = [
  {
    value: '1PCM',
    label: '1PCM',
  },
  {
    value: '2PCM',
    label: '2PCM',
  },
  {
    value: '1CAL',
    label: '1CAL',
  },
];

export const onChange = (value: string[]) => {
  console.log(value);
};
