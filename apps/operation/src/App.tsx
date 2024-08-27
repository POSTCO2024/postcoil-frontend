import { Navigation, ContentBoard } from '@postcoil/ui';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom';

import human from './assets/human.svg';
import logo from './assets/logo.svg';
import { MenuItems, mappingKeys } from './config/MenuItems';
import './styles/global.scss';
import ThreeDMonitoring from './pages/\bfo002/ThreeDMonitoring';
import TaskInstruction from './pages/fo001/TaskInstruction';
// config 안의 MenuItems 파일을 만져서 네이게이션에 들어갈 부분 수정가능
// <ContentBoard Board={ExampleJoUp} /> 이부분에서 ExampleJoUp 에 당신의 페이지를 넣으면 됩니다
function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Navigation
          logo={logo}
          human={human}
          menuItems={MenuItems}
          mappingKeys={mappingKeys}
          isOperationSystem={true}
        />
        <Routes>
          <Route path="/" element={<Navigate replace to="/operation1" />} />
          <Route
            path="/operation1"
            element={<ContentBoard Board={TaskInstruction} />}
          />
          <Route
            path="/operation2"
            element={<ContentBoard Board={ThreeDMonitoring} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
