import './App.css';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import {BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
import {CreateNew} from "./components/CreateNew"
import { Layout } from './components/Layout';
import { EditDoocument } from './components/EditDocument';
import { LoginPage } from './components/LoginPage';

const getUsername = localStorage.getItem("Username")
const getPassword = localStorage.getItem("Password")


function logout(){
  localStorage.clear();
  window.location.reload(false);
}

function login(){
  
}




function App() {

  return(
    <Router>
      <nav>
        {getUsername == "admin" && getPassword =="admin" && <Link to="/documents" className='home-link'>Home</Link>}
        {getUsername == "admin" && getPassword =="admin" && <Link to="/createnew" className='home-link'>Create New Document</Link>}
        { getUsername == "admin" && getPassword =="admin" ? <button onClick={logout} className="linkBtn">Logout</button> : <Link to="/" className='home-link'>Login</Link>}
      </nav>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/documents' element={<Layout/>}/>
        <Route path='/createnew' element={<CreateNew/>}/>
        <Route path='/edit/:id' element={<EditDoocument/>}/>

      </Routes>
      
    </Router>
  )
}



export default App;
