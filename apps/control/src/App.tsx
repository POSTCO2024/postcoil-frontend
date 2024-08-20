import { ContentBoard, Navigation } from '@postcoil/ui';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import human from './assets/human.svg';
import logo from './assets/logo.svg';
import { MenuItems } from './config/MenuItems';
import './styles/global.scss';
import Board1 from './pages/fc001a/Board/Borad';
import Board2 from './pages/fc002a/Board/Board';
import ExtMPage from './pages/management/extraction/ExtMPage';
import SchMPage from './pages/management/schedule/SchMPage';
import Fc003 from './pages/monitoring/Fc003';
import StockCharts from './pages/monitoring/stock/StockCharts';
import SchPePage from './pages/scheduling/pending/SchPePage';
import SchPPage from './pages/scheduling/plan/SchPPage';
import SchRpage from './pages/scheduling/result/SchRPage';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Navigation logo={logo} human={human} menuItems={MenuItems} />
        <Routes>
          <Route path="/" element={<Navigate replace to="/control1" />} />
          <Route path="/control1" element={<ContentBoard Board={Board1} />} />
          <Route path="/control2" element={<ContentBoard Board={Board2} />} />
          <Route path="/control3" element={<ContentBoard Board={Fc003} />} />
          <Route
            path="/control4"
            element={<ContentBoard Board={StockCharts} />}
          />
          <Route
            path="/schedule1"
            element={<ContentBoard Board={SchPPage} />}
          />
          <Route
            path="/schedule2"
            element={<ContentBoard Board={SchPePage} />}
          />
          <Route
            path="/schedule3"
            element={<ContentBoard Board={SchRpage} />}
          />
          <Route path="/manage1" element={<ContentBoard Board={ExtMPage} />} />
          <Route path="/manage2" element={<ContentBoard Board={SchMPage} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
