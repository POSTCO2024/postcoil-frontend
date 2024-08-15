import { Navigation, Items, ContentBoard } from '@postcoil/ui';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import human from './assets/human.svg';
import logo from './assets/logo.svg';
import './styles/global.scss';
import ExtMPage from './pages/management/extraction/ExtMPage';
import SchMPage from './pages/management/schedule/SchMPage';
// package/common-ui/config 안의 일을 만져서 네이게이션에 들어갈 부분 수정가능
// <ContentBoard Board={ExampleJoUp} /> 이부분에서 ExampleJoUp 에 당신의 페이지를 넣으면 됩니다
function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Navigation logo={logo} human={human} menuItems={Items} />
        <Routes>
          <Route path="/control1" element={<ContentBoard Board={ExtMPage} />} />
          <Route path="/control2" element={<ContentBoard Board={SchMPage} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
