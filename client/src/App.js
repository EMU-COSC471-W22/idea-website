import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Upload from './pages/Upload'
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/administration/Admin';
import PageNotFound from './pages/PageNotFound';

/* Import styling */
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import './styles/NavigationBar.css';
import './styles/Upload.css';
import './styles/Contact.css';
import './styles/About.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NavigationBar />}>
          <Route index element={<Home />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;