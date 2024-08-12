import { Navigation } from '@postcoil/ui';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import human from './assets/human.svg';
import logo from './assets/logo.svg';
import './styles/global.scss';
import { Board } from './pages/fc001a/Board/Borad';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Navigation logo={logo} human={human} />
        <Routes>
          <Route path="/control1" />
          <Route path="/control2" />
        </Routes>
        <Board />
      </div>
    </Router>
  );
}

export default App;
