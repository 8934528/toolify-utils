import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createSession, getSession, setSession } from '../utils/session';
import { type SessionData } from '../types';

interface SessionContextType {
  session: SessionData | null;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSessionState] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initSession = () => {
      const params = new URLSearchParams(location.search);
      const urlSessionId = params.get('session');
      
      let currentSession = getSession();

      if (!currentSession) {
        currentSession = createSession();
        setSession(currentSession);
      }

      // Keep session query param in sync for all routes while preserving other params.
      if (urlSessionId !== currentSession.id) {
        params.set('session', currentSession.id);
        navigate(
          {
            pathname: location.pathname,
            search: `?${params.toString()}`,
          },
          { replace: true }
        );
      }

      setSessionState(currentSession);
      setIsLoading(false);
    };

    initSession();
  }, [location.pathname, location.search, navigate]);

  return (
    <SessionContext.Provider value={{ session, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};
