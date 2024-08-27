import { jsx as _jsx } from "react/jsx-runtime";
import styles from './ContentBoard.module.scss';
export function ContentBoard({ Board }) {
    return (_jsx("div", { className: styles.greyBack, children: _jsx("div", { className: styles.whiteBoard, children: Board && _jsx(Board, {}) }) }));
}
export default ContentBoard;
//# sourceMappingURL=ContentBoard.js.map