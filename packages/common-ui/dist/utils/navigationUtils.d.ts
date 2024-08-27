import type { MenuProps } from 'antd';
export interface NavigationProps {
    logo: string;
    human: string;
    menuItems: MenuProps['items'];
    mappingKeys?: Array<{
        key: string;
        path: string;
    }>;
    isOperationSystem?: boolean;
}
export interface LevelKeysProps {
    key?: string;
    children?: LevelKeysProps[];
}
export declare const getLevelKeys: (items1: LevelKeysProps[]) => Record<string, number>;
//# sourceMappingURL=navigationUtils.d.ts.map