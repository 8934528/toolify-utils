import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SessionProvider } from './hooks/useSession';
import { ToastProvider } from './hooks/useToast';
import Navbar from './components/Layout/Navbar';
import Toast from './components/Layout/Toast';
import Home from './pages/Home/Home';
import Calculator from './pages/Calculator/Calculator';
import TemperatureConverter from './pages/TemperatureConverter/TemperatureConverter';
import Todo from './pages/Todo/Todo';
import Unavailable from './pages/Unavailable/Unavailable';
import './App.css';

function App() {
  return (
    <Router>
      <SessionProvider>
        <ToastProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/temperature" element={<TemperatureConverter />} />
                <Route path="/todo" element={<Todo />} />
                <Route path="/unavailable" element={<Unavailable />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Toast />
          </div>
        </ToastProvider>
      </SessionProvider>
    </Router>
  );
}

export default App;
