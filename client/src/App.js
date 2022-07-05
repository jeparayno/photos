
import './App.css';

import {  
  BrowserRouter as Router,  
  Routes,  
  Route
}   
from 'react-router-dom';  
import { useState } from 'react';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddPhoto from './components/AddPhoto';


const App=()=> {

  const [photoCollection,setPhotoCollection] = useState([]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path={'/'} element={<Register />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/upload'} element={<AddPhoto photoCollection={photoCollection} setPhotoCollection={setPhotoCollection}/>}/>
          <Route path={'/dashboard'} element={<Dashboard/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
