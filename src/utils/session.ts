import { type SessionData } from '../types';

const SESSION_EXPIRY_MINUTES = 30;
const SESSION_KEY = 'toolify_session';

export const generateSessionId = (): string => {
  return 'sess-' + Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

export const createSession = (): SessionData => {
  return {
    id: generateSessionId(),
    expiry: Date.now() + (SESSION_EXPIRY_MINUTES * 60 * 1000)
  };
};

export const getSession = (): SessionData | null => {
  const stored = sessionStorage.getItem(SESSION_KEY);
  if (!stored) return null;
  
  try {
    const session: SessionData = JSON.parse(stored);
    if (Date.now() > session.expiry) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
};

export const setSession = (session: SessionData): void => {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const isValidSession = (sessionId: string): boolean => {
  const session = getSession();
  return session !== null && session.id === sessionId;
};
