import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Cascader } from 'antd';
import styles from './DropdownColor.module.css';
// // Cascader value
// const optionsDropdown: OptionType[] = [
//   {
//     value: '1PCM',
//     label: '1PCM',
//   },
//   {
//     value: '2PCM',
//     label: '2PCM',
//   },
//   {
//     value: '1CAL',
//     label: '1CAL',
//   },
// ];
// const onChange = (value: string[]) => {
//   console.log(value);
// };
export const DropdownColor = ({ title, options, onChange, }) => {
    // const handleAreaClick = (
    //   e: React.MouseEvent<HTMLAnchorElement>,
    //   label: string,
    //   option: DefaultOptionType,
    // ) => {
    //   e.stopPropagation();
    //   console.log('clicked', label, option);
    // };
    // 각 dropdown을 클릭시 보여줄 내용
    // const displayRender: CascaderProps<OptionType>['displayRender'] = (
    //   labels,
    //   selectedOptions = [],
    // ) =>
    //   labels.map((label, i) => {
    //     // label 은 이름
    //     const option = selectedOptions[i];
    //     //option 은 각 배열요소의 모든 값들
    //     // console.dir(option);
    //     if (i === labels.length - 1) {
    //       return (
    //         <span key={option.value}>
    //           {option.icon}
    //           {label}
    //           {/* (
    //           <a onClick={(e) => handleAreaClick(e, label, option)}>
    //             {option.label}
    //           </a>
    //           ) */}
    //         </span>
    //       );
    //     }
    //     return <span key={option.value}>{label} / </span>;
    //   });
    return (_jsxs("div", { className: styles.dropdownContainer, children: [_jsxs("span", { children: [" ", title, " "] }), _jsx("span", { className: styles.spacer }), _jsx(Cascader, { options: options, 
                // displayRender={displayRender}
                onChange: onChange
                    ? onChange
                    : () => {
                        console.log('Dropdown Click');
                    }, placeholder: "\uC120\uD0DD" }), _jsx("span", { className: styles.spacer })] }));
};
export default DropdownColor;
//# sourceMappingURL=DropdownColor.js.map