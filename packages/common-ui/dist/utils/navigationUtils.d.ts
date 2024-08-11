import type { MenuProps } from 'antd';
export interface NavigationProps {
    logo: string;
    human: string;
}
export interface LevelKeysProps {
    key?: string;
    children?: LevelKeysProps[];
}
type MenuItem = Required<MenuProps>['items'][number];
export declare const items: MenuItem[];
export declare const getLevelKeys: (items1: LevelKeysProps[]) => Record<string, number>;
export {};
//# sourceMappingURL=navigationUtils.d.ts.map