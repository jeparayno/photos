
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
import PhotoDetails from './components/PhotoDetails';


const App=()=> {

  const [photoCollection,setPhotoCollection] = useState([]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path={'/'} element={<Register />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/form'} element={<AddPhoto photoCollection={photoCollection} setPhotoCollection={setPhotoCollection}/>}/>
          <Route path={'/dashboard'} element={<Dashboard/>} />
          <Route path={'/dashboard/photos/:aid'} element={<PhotoDetails/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
