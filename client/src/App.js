import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Upload from './pages/Upload'
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Admin from './pages/administration/Admin';
import PageNotFound from './pages/PageNotFound';
import { AuthContext } from './helpers/AuthContext';
import axios from 'axios';

/* Import styling */
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import './styles/NavigationBar.css';
import './styles/Upload.css';
import './styles/Contact.css';
import './styles/About.css';
import './styles/Home.css';

function App() {
  const [authState, setAuthState] = useState({
    status: false, 
    username: "", 
    isAdmin: false, 
    firstName: "", 
    lastName: ""
  });

  useEffect(() => {
    axios.get("http://localhost:3001/auth/validation", { headers: {
      accessToken: localStorage.getItem("accessToken")
    } }).then((response) => {
      console.log(response.data);
      /* checks if there are errors from the middleware */
      if (response.data.error) {
        setAuthState({status: false, isAdmin: false});
      } else {
        let username = response.data.username;
        let firstName = response.data.firstName;
        let lastName = response.data.lastName;
        if (response.data.type === "admin") {
          setAuthState({
            status: true, 
            username: username, 
            isAdmin: true,
            firstName: firstName,
            lastName: lastName  
          });
        } else {
          setAuthState({
            status: true, 
            username: username, 
            isAdmin: false,
            firstName: firstName,
            lastName: lastName 
          });
        }
      }
    });
  }, [authState.status]);

  return (
    <AuthContext.Provider value={{authState, setAuthState}} >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavigationBar />}>
            <Route index element={<Home />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/upload' element={<Upload />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;