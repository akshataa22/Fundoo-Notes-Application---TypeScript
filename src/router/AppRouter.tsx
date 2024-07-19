import { Route, Routes } from 'react-router-dom';
import Login from './../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../components/Dashboard';
import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/Layout';
import Archived from '../components/Archived';
import Trashed from '../components/Trashed';
import Reminder from '../components/Reminder';

const AppRouter = () => {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/register" element ={<AuthRoute><Register /></AuthRoute>} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/archived' element={<ProtectedRoute><Archived /></ProtectedRoute>} />
        <Route path='/trashed' element={<ProtectedRoute><Trashed /></ProtectedRoute>} />
        <Route path='/reminder' element={<ProtectedRoute><Reminder /></ProtectedRoute>} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;