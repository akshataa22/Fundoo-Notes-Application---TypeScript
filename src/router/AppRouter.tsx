import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../components/Dashboard';
import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/register" element ={<AuthRoute><Register /></AuthRoute>} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default AppRouter;