import React from 'react';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import { Container } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './../src/router/AppRouter';

function App() {
  return (
    <div>  
    <Router>
      <Container>
       <AppRouter />
       <ToastContainer />
      </Container>
    </Router>
  </div>
  );
}

export default App;