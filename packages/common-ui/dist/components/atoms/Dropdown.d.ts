import React from 'react';
interface DropdownProps {
    title: string;
    options: OptionType[];
    onChange?: (value?: string[]) => void;
}
interface OptionType {
    value: string;
    label: string | React.ReactNode;
}
export declare const Dropdown: React.FC<DropdownProps>;
export default Dropdown;
//# sourceMappingURL=Dropdown.d.ts.map