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
import StockCharts from './pages/monitoring/stock/StockCharts';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Navigation logo={logo} human={human} menuItems={MenuItems} />
        <Routes>
          <Route path="/" element={<Navigate replace to="/control1" />} />
          <Route path="/control1" element={<ContentBoard />} />
          <Route path="/control2" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
