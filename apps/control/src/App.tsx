import { ContentBoard, Navigation } from '@postcoil/ui';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import human from './assets/human.svg';
import logo from './assets/logo.svg';
import { MenuItems, mappingKeys } from './config/MenuItems';
import './styles/global.scss';
import Fc001 from './pages/fc001/Fc001';
import Fc002 from './pages/fc002/Fc002';
import Fc003 from './pages/fc003/Fc003';
import Fc004 from './pages/fc004/DashBoard';
import ExtMPage from './pages/fmc001/ExtMPage';
import ErrMPage from './pages/fme001/ErrMPage';
import SchMPage from './pages/fms001/SchMPage';
import SchPPage from './pages/fs001/SchPPage';
import SchPePage from './pages/fs002/SchPePage';
import SchRPage from './pages/fs003/SchRPage';
import Fs004a from './pages/fs004/Fs004a';
import Fs004b from './pages/fs004/Fs004b';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Navigation
          logo={logo}
          human={human}
          menuItems={MenuItems}
          mappingKeys={mappingKeys}
        />
        <Routes>
          <Route path="/" element={<Navigate replace to="/control1" />} />
          <Route path="/control1" element={<ContentBoard Board={Fc001} />} />
          <Route path="/control2" element={<ContentBoard Board={Fc002} />} />
          <Route path="/control3" element={<ContentBoard Board={Fc003} />} />
          <Route path="/control4/*" element={<ContentBoard Board={Fc004} />} />
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
          <Route path="/roll/*" element={<ContentBoard Board={Fs004b} />} />
          <Route path="/manage1" element={<ContentBoard Board={ExtMPage} />} />
          <Route path="/manage2" element={<ContentBoard Board={ErrMPage} />} />
          <Route path="/manage3" element={<ContentBoard Board={SchMPage} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
