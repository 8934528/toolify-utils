import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/useToast';
import { type CalculatorHistory } from '../../types';
import './Calculator.css';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState('');
  const [operation, setOperation] = useState<string | null>(null);
  const [resetDisplay, setResetDisplay] = useState(false);
  const [history, setHistory] = useState<CalculatorHistory[]>([]);
  const { showToast } = useToast();
  
  const handleClear = useCallback(() => {
    setDisplay('0');
    setPreviousValue('');
    setOperation(null);
    setResetDisplay(false);
  }, []);

  const addToHistory = useCallback((expression: string, result: string) => {
    const historyItem: CalculatorHistory = {
      expression,
      result,
      timestamp: new Date().toLocaleTimeString()
    };

    setHistory(prevHistory => {
      const newHistory = [historyItem, ...prevHistory].slice(0, 10);
      localStorage.setItem('calcHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const handleCalculate = useCallback(() => {
    if (!operation || !previousValue) return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(display);

    if (isNaN(prev) || isNaN(current)) {
      showToast('Error', 'Invalid calculation', 'error');
      return;
    }

    let result: number;
    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        if (current === 0) {
          showToast('Error', 'Cannot divide by zero', 'error');
          handleClear();
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }

    const expression = `${previousValue} ${operation} ${display}`;
    const resultStr = result.toString();

    addToHistory(expression, resultStr);
    setDisplay(resultStr);
    setPreviousValue('');
    setOperation(null);
    setResetDisplay(true);
  }, [operation, previousValue, display, showToast, addToHistory, handleClear]);

  const handleOperator = useCallback((op: string) => {
    if (operation !== null) handleCalculate();
    setPreviousValue(display);
    setOperation(op);
    setResetDisplay(true);
  }, [operation, display, handleCalculate]);

  const handleNumber = useCallback((num: string) => {
    if (resetDisplay) {
      setDisplay(num);
      setResetDisplay(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  }, [display, resetDisplay]);

  const handlePercentage = useCallback(() => {
    const value = parseFloat(display) / 100;
    setDisplay(value.toString());
  }, [display]);

  const handleBackspace = useCallback(() => {
    if (display.length === 1 || (display.length === 2 && display.startsWith('-'))) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  }, [display]);

  const loadHistory = useCallback(() => {
    const saved = localStorage.getItem('calcHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('calcHistory');
    showToast('Success', 'History cleared', 'success');
  }, [showToast]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/[0-9.]/.test(e.key)) {
        handleNumber(e.key);
      } else if (['+', '-', '*', '/'].includes(e.key)) {
        handleOperator(e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleCalculate();
      } else if (e.key === 'Escape') {
        handleClear();
      } else if (e.key === 'Backspace') {
        e.preventDefault(); // Prevent browser back navigation
        handleBackspace();
      } else if (e.key === '%') {
        handlePercentage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNumber, handleOperator, handleCalculate, handleClear, handleBackspace, handlePercentage]);

  return (
    <div className="calculator-page">
      <div className="calculator-container">
        <div className="calculator-main">
          <div className="calculator-header">
            <h1>
              <i className="fi fi-rr-calculator"></i>
              Calculator
            </h1>
          </div>

          <div className="calculator-display">
            <div className="display-value">{display}</div>
          </div>

          <div className="calculator-buttons">
            <div className="button-grid">
              <button onClick={handleClear} className="btn-clear">C</button>
              <button onClick={handleBackspace} title='delete' className="btn-operator">
                <i className="fi fi-rr-delete"></i>
              </button>
              <button onClick={() => handleOperator('/')} className="btn-operator">/</button>
              <button onClick={() => handleOperator('*')} className="btn-operator">×</button>

              <button onClick={() => handleNumber('7')}>7</button>
              <button onClick={() => handleNumber('8')}>8</button>
              <button onClick={() => handleNumber('9')}>9</button>
              <button onClick={() => handleOperator('-')} className="btn-operator">-</button>

              <button onClick={() => handleNumber('4')}>4</button>
              <button onClick={() => handleNumber('5')}>5</button>
              <button onClick={() => handleNumber('6')}>6</button>
              <button onClick={() => handleOperator('+')} className="btn-operator">+</button>

              <button onClick={() => handleNumber('1')}>1</button>
              <button onClick={() => handleNumber('2')}>2</button>
              <button onClick={() => handleNumber('3')}>3</button>
              <button onClick={handleCalculate} className="btn-equal">=</button>

              <button onClick={() => handleNumber('0')} className="btn-zero">0</button>
              <button onClick={() => handleNumber('.')}>.</button>
              <button onClick={handlePercentage} className="btn-operator">%</button>
            </div>
          </div>
        </div>

        <div className="calculator-history">
          <div className="history-header">
            <h3>
              <i className="fi fi-rr-time-past"></i>
              History
            </h3>
            {history.length > 0 && (
              <button onClick={clearHistory} title='trash' className="btn-clear-history">
                <i className="fi fi-rr-trash"></i>
              </button>
            )}
          </div>

          <div className="history-list">
            {history.length === 0 ? (
              <div className="history-empty">
                <i className="fi fi-rr-inbox"></i>
                <p>No calculations yet</p>
              </div>
            ) : (
              history.map((item, index) => (
                <div key={index} className="history-item">
                  <div className="history-expression">{item.expression} =</div>
                  <div className="history-result">{item.result}</div>
                  <div className="history-time">{item.timestamp}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
