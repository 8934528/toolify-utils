import { BrowserRouter as Router } from 'react-router-dom';
import { SessionProvider } from './hooks/useSession';
import { ToastProvider } from './hooks/useToast';
import Navbar from './components/Layout/Navbar';
import Toast from './components/Layout/Toast';
import AnimatedRoutes from './AnimatedRoutes';
import './App.css';

function App() {
  return (
    <Router>
      <SessionProvider>
        <ToastProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <AnimatedRoutes />
            </main>
            <Toast />
          </div>
        </ToastProvider>
      </SessionProvider>
    </Router>
  );
}

export default App;
