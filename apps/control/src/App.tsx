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
import Fc001 from './pages/fc001/Fc001';
import Fc002 from './pages/fc002/Fc002';
import DashBoard from './pages/fc004/DashBoard';
import ExtMPage from './pages/management/extraction/ExtMPage';
import SchMPage from './pages/management/schedule/SchMPage';
import Fc003 from './pages/monitoring/Fc003';
import SchPePage from './pages/scheduling/pending/SchPePage';
import SchPPage from './pages/scheduling/plan/SchPPage';
import SchRPage from './pages/scheduling/result/SchRPage';
import Fs004a from './pages/scheduling/timeline/Fs004a';
import Fs004b from './pages/scheduling/timeline/Fs004b';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Navigation logo={logo} human={human} menuItems={MenuItems} />
        <Routes>
          <Route path="/" element={<Navigate replace to="/control1" />} />
          <Route path="/control1" element={<ContentBoard Board={Fc001} />} />
          <Route path="/control2" element={<ContentBoard Board={Fc002} />} />
          <Route path="/control3" element={<ContentBoard Board={Fc003} />} />
          <Route
            path="/control4"
            element={<ContentBoard Board={DashBoard} />}
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
            element={<ContentBoard Board={SchRPage} />}
          />
          <Route path="/schedule4" element={<ContentBoard Board={Fs004a} />} />
          <Route path="/manage1" element={<ContentBoard Board={ExtMPage} />} />
          <Route path="/manage2" element={<ContentBoard Board={SchMPage} />} />
          <Route path="/roll/*" element={<ContentBoard Board={Fs004b} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
