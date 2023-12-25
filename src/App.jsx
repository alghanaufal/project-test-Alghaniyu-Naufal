import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Work from './Page/Work';
import About from './Page/About';
import Services from './Page/Services';
import Ideas from './Page/Ideas';
import Careers from './Page/Careers';
import Contact from './Page/Contact';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route
          path="/"
          element={
            <Work />
          }
        />
        <Route
          path="/About"
          element={
            <About />
          }
        />
        <Route
          path="/Services"
          element={
            <Services />
          }
        />
        <Route
          path="/Ideas"
          element={
            <Ideas />
          }
        />
        <Route
          path="/Careers"
          element={
            <Careers />
          }
        />
        <Route
          path="/Contact"
          element={
            <Contact />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
