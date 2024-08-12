import { Button } from '@postcoil/ui';
import './styles/global.scss';

function App() {
  const handleNavigation = (path: string) => {
    window.location.href = path; // 로컬 URL로 리다이렉트
  };
  return (
    <>
      <Button
        text={'관제'} // control 앱으로 이동
        onClick={() => handleNavigation('http://localhost:4000/')}
      />
      <Button
        text={'조업'} // operation 앱으로 이동
        onClick={() => handleNavigation('http://localhost:6050/')}
      />
    </>
  );
}

export default App;
