import React from 'react';
interface DropdownProps {
    title: string;
    options: OptionType[] | undefined;
    onChange?: (value?: string[]) => void | Promise<void>;
    value?: string[];
}
interface OptionType {
    value: string;
    label: string | React.ReactNode;
}
export declare const Dropdown: React.FC<DropdownProps>;
export default Dropdown;
//# sourceMappingURL=Dropdown.d.ts.map