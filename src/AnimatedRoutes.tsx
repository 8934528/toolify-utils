import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home/Home';
import Calculator from './pages/Calculator/Calculator';
import TemperatureConverter from './pages/TemperatureConverter/TemperatureConverter';
import Todo from './pages/Todo/Todo';
import Unavailable from './pages/Unavailable/Unavailable';
import PageTransition from './components/Layout/PageTransition';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/calculator" element={<PageTransition><Calculator /></PageTransition>} />
        <Route path="/temperature" element={<PageTransition><TemperatureConverter /></PageTransition>} />
        <Route path="/todo" element={<PageTransition><Todo /></PageTransition>} />
        <Route path="/unavailable" element={<PageTransition><Unavailable /></PageTransition>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
