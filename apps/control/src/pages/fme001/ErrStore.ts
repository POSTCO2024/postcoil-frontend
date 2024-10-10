import { create } from 'zustand';

interface ManageErr {
  key: string;
  id: string;
  columnName: string;
  value: string;
}
interface Store {
  manageData: Record<string, ManageErr[]>;
  setManageData: (progress: string, newData: ManageErr[]) => void;
}

const useStandardStore = create<Store>((set) => ({
  manageData: {
    '1PCM': [
      { key: '20', id: '20', columnName: '표면엄격재', value: 'JPN' },
      { key: '21', id: '21', columnName: '내후성강', value: 'PAWS50' },
    ],
    '2PCM': [
      { key: '20', id: '20', columnName: '표면엄격재', value: 'JPN' },
      { key: '21', id: '21', columnName: '내후성강', value: 'PAWS50' },
    ],
    '1CAL': [
      { key: '20', id: '20', columnName: '표면엄격재', value: 'JPN' },
      { key: '21', id: '21', columnName: '내후성강', value: 'PAWS50' },
    ],
    '2CAL': [
      { key: '20', id: '20', columnName: '표면엄격재', value: 'JPN' },
      { key: '21', id: '21', columnName: '내후성강', value: 'PAWS50' },
    ],
    '1EGL': [
      { key: '20', id: '20', columnName: '표면엄격재', value: 'JPN' },
      { key: '21', id: '21', columnName: '내후성강', value: 'PAWS50' },
    ],
    '2EGL': [
      { key: '20', id: '20', columnName: '표면엄격재', value: 'JPN' },
      { key: '21', id: '21', columnName: '내후성강', value: 'PAWS50' },
    ],
    '1CGL': [
      { key: '20', id: '20', columnName: '표면엄격재', value: 'JPN' },
      { key: '21', id: '21', columnName: '내후성강', value: 'PAWS50' },
    ],
    '2CGL': [
      { key: '20', id: '20', columnName: '표면엄격재', value: 'JPN' },
      { key: '21', id: '21', columnName: '내후성강', value: 'PAWS50' },
    ],
  },
  setManageData: (progress, newData) =>
    set((state) => ({
      manageData: {
        ...state.manageData,
        [progress]: newData,
      },
    })),
}));
export default useStandardStore;
