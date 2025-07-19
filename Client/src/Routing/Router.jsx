import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      
    ],
  },
]);

export default Routes;
