import React from 'react';
interface DropdownProps {
    title: string;
    options: OptionType[];
    onChange?: (value?: string[]) => void;
}
interface OptionType {
    value: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
}
export declare const DropdownColor: React.FC<DropdownProps>;
export default DropdownColor;
//# sourceMappingURL=DropdownColor.d.ts.map