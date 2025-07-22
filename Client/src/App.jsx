import { Outlet } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import SplashCursor  from '../ReactBits/SplashCursor/SplashCursor.jsx';

const App = () => {
  return (
    <div>
      <Navbar/>
      <SplashCursor />
      <Outlet />
    </div>
  );
};

export default App;
