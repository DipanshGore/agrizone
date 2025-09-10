import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Register from '../pages/Register.jsx';
import Home from '../pages/Home.jsx';
import VerifyOtp from '../pages/VerifyOtp.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import AgriStore from '../pages/AgriStore.jsx';
import PageNotFound from '../helper/NotFound.jsx';
import Login from '../pages/Login.jsx';
import ProtectedRoute from "../components/ProtectedRoute";
import FarmerDashboard from '../pages/FarmerDashboard.jsx';
import CustomerDashboard from '../pages/CustomerDashboard.jsx';
import AdminDashboard from '../pages/AdminDashboard.jsx';



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
      },
      {
        path: '/verify-otp',
        element: <VerifyOtp />
      },
      {
        path: '/About',
        element: <About />
      },
      {
        path: '/Contact',
        element: <Contact />
      },
      {
        path: '/Store',
        element: <AgriStore />
      },
      {
        path: '/Login',
        element: <Login />
      },
      {
        path: "/farmer-dashboard",
        element: (
          <ProtectedRoute allow={["farmer"]}>
            <FarmerDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/customer-dashboard",
        element: (
          <ProtectedRoute allow={["customer"]}>
            <CustomerDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <ProtectedRoute allow={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <PageNotFound />
      },


    ],
  },
]);

export default Routes;
