import React from 'react';
interface SearchBarProps {
    options?: OptionType[];
    onChange?: (value?: string[]) => void;
    onSearch?: (value?: string) => void;
}
interface OptionType {
    value: string;
    label: string;
}
export declare const SearchBar: React.FC<SearchBarProps>;
export default SearchBar;
//# sourceMappingURL=SearchBar.d.ts.map