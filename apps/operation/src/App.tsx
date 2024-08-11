import { Navigation } from '@postcoil/ui';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import human from './assets/human.svg';
import logo from './assets/logo.svg';
import './styles/global.scss';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Navigation logo={logo} human={human} />
        <Routes>
          <Route path="/operation1" />
          <Route path="/operation2" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
