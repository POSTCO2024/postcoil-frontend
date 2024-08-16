import { Navigation, ContentBoard } from '@postcoil/ui';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import human from './assets/human.svg';
import logo from './assets/logo.svg';
import { MenuItems } from './config/Menutems';
import ExampleJoUp from './pages/ExampleJoUp';
import './styles/global.scss';
// config 안의 MenuItems 파일을 만져서 네이게이션에 들어갈 부분 수정가능
// <ContentBoard Board={ExampleJoUp} /> 이부분에서 ExampleJoUp 에 당신의 페이지를 넣으면 됩니다
function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Navigation logo={logo} human={human} menuItems={MenuItems} />
        <Routes>
          <Route
            path="/operation1"
            element={<ContentBoard Board={ExampleJoUp} />}
          />
          <Route
            path="/operation2"
            element={<ContentBoard Board={ExampleJoUp} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
