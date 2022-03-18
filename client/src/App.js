import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Artists from './pages/Artists';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFoundPage from './pages/NotFoundPage';
import './styles/Gallery.css';

function App() {
    return (
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<Navbar />}>
                <Route index element={<Home />} />
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/artists' element={<Artists />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='*' element={<NotFoundPage />} />
              </Route>
          </Routes>
      </BrowserRouter>
    );
}

export default App;