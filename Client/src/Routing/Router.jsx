import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Register from '../pages/Register.jsx';
import Home from '../pages/Home.jsx';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { 
        index: true,
        element: <Home />
      },
      {
        path: '/Home',
        element: <Home />
      },
      {
        path: '/Register',
        element: <Register />
      }
    ],
  },
]);

export default Routes;
