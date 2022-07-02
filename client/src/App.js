
import './App.css';

import {  
  BrowserRouter as Router,  
  Routes,  
  Route
}   
from 'react-router-dom';  
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path={'/'} element={<Register />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/dashboard'} element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
