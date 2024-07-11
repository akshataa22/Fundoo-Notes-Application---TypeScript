import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../components/Dashboard';

const AppRouter = () => {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element ={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default AppRouter;