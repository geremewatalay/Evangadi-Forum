import React, { useEffect, useState, createContext} from 'react';
import { data, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from './axiosConfig';


export const AppState = createContext()
function App() {
  const[user, setUser] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();


async function checkUser() {
  try {
    await axios.get('/users/check',{
      headers:{ 
         Authorization:'Bearer' + token,
      },
    });
    
    setUser(data);
  } catch (error) {
    console.log(error.response)
    navigate('/login');
    
  }
}

useEffect(()=>{
checkUser();
}, []);


  return (
    <AppState.Provider value={{user, setUser}}>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
    </AppState.Provider>
    
  );
}

export default App;
