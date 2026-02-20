export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  addedAt: string;
}

export interface ConversionHistory {
  fromValue: number;
  fromUnit: string;
  toValue: number;
  toUnit: string;
  timestamp: string;
}

export interface CalculatorHistory {
  expression: string;
  result: string;
  timestamp: string;
}

export interface SessionData {
  id: string;
  expiry: number;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: number;
  title: string;
  message: string;
  type: ToastType;
}

export type { 
  Task as TaskType,
  ConversionHistory as ConversionHistoryType,
  CalculatorHistory as CalculatorHistoryType,
  SessionData as SessionDataType,
  ToastMessage as ToastMessageType
};
