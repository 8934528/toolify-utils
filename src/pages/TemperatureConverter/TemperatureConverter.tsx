import React, { useState, useEffect } from 'react';
import { useToast } from '../../hooks/useToast';
import { type ConversionHistory } from '../../types';
import './TemperatureConverter.css';

const TemperatureConverter: React.FC = () => {
  const [temperature, setTemperature] = useState<string>('');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<ConversionHistory[]>([]);
  const { showToast } = useToast();

  const units = {
    celsius: { symbol: '°C', name: 'Celsius' },
    fahrenheit: { symbol: '°F', name: 'Fahrenheit' },
    kelvin: { symbol: 'K', name: 'Kelvin' }
  };

  const loadHistory = () => {
    const saved = localStorage.getItem('tempHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const convert = () => {
    const value = parseFloat(temperature);
    
    if (isNaN(value)) {
      showToast('Error', 'Please enter a valid temperature', 'error');
      return;
    }

    let converted: number;

    // Convert to Celsius first
    let celsius: number;
    switch (fromUnit) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * 5 / 9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      default:
        celsius = value;
    }

    // Convert from Celsius to target unit
    switch (toUnit) {
      case 'celsius':
        converted = celsius;
        break;
      case 'fahrenheit':
        converted = (celsius * 9 / 5) + 32;
        break;
      case 'kelvin':
        converted = celsius + 273.15;
        break;
      default:
        converted = celsius;
    }

    setResult(converted);
    addToHistory(value, fromUnit, converted, toUnit);
    showToast(
      'Conversion Complete',
      `${value}${units[fromUnit as keyof typeof units].symbol} = ${converted.toFixed(2)}${units[toUnit as keyof typeof units].symbol}`,
      'success'
    );
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    if (result !== null) {
      convert();
    }
  };

  const addToHistory = (
    fromValue: number,
    fromUnit: string,
    toValue: number,
    toUnit: string
  ) => {
    const historyItem: ConversionHistory = {
      fromValue,
      fromUnit: units[fromUnit as keyof typeof units].symbol,
      toValue,
      toUnit: units[toUnit as keyof typeof units].symbol,
      timestamp: new Date().toLocaleString()
    };

    const newHistory = [historyItem, ...history].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem('tempHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('tempHistory');
    showToast('Success', 'History cleared', 'success');
  };

  // Renamed from useHistoryItem to handleHistoryItemClick (it's not a Hook, it's an event handler)
  const handleHistoryItemClick = (item: ConversionHistory) => {
    setTemperature(item.fromValue.toString());
    
    // Find matching units
    Object.entries(units).forEach(([key, value]) => {
      if (value.symbol === item.fromUnit) {
        setFromUnit(key);
      }
      if (value.symbol === item.toUnit) {
        setToUnit(key);
      }
    });

    convert();
  };

  return (
    <div className="converter-page">
      <div className="converter-container">
        <div className="converter-main">
          <div className="converter-header">
            <h1>
              <i className="fi fi-rr-temperature-high"></i>
              Temperature Converter
            </h1>
          </div>

          <div className="converter-card">
            <div className="input-group">
              <label>
                <i className="fi fi-rr-thermometer"></i>
                Temperature
              </label>
              <input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                placeholder="Enter temperature"
                className="temperature-input"
                onKeyPress={(e) => e.key === 'Enter' && convert()}
              />
              <span className="input-symbol">
                {units[fromUnit as keyof typeof units].symbol}
              </span>
            </div>

            <div className="unit-controls">
              <div className="unit-select">
                <label>From</label>
                <select 
                  value={fromUnit} 
                  onChange={(e) => setFromUnit(e.target.value)}
                  title='select input unit'
                  className="unit-select-input"
                >
                  {Object.entries(units).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={swapUnits} title='exchange' className="swap-button">
                <i className="fi fi-rr-exchange"></i>
              </button>

              <div className="unit-select">
                <label>To</label>
                <select 
                  value={toUnit} 
                  onChange={(e) => setToUnit(e.target.value)}
                  title='select output unit'
                  className="unit-select-input"
                >
                  {Object.entries(units).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button onClick={convert} className="convert-button">
              <i className="fi fi-rr-refresh"></i>
              Convert
            </button>

            {result !== null && (
              <div className="result-card">
                <div className="result-icon">
                  <i className="fi fi-rr-temperature-high"></i>
                </div>
                <div className="result-content">
                  <div className="result-label">Result</div>
                  <div className="result-value">
                    {result.toFixed(2)}
                    <span className="result-unit">
                      {units[toUnit as keyof typeof units].symbol}
                    </span>
                  </div>
                  <div className="result-details">
                    {temperature} {units[fromUnit as keyof typeof units].symbol} = 
                    {result.toFixed(2)} {units[toUnit as keyof typeof units].symbol}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="converter-history">
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
                <p>No conversions yet</p>
              </div>
            ) : (
              history.map((item, index) => (
                <div 
                  key={index} 
                  className="history-item clickable"
                  onClick={() => handleHistoryItemClick(item)}
                >
                  <div className="history-conversion">
                    {item.fromValue} {item.fromUnit} =
                  </div>
                  <div className="history-result">
                    {item.toValue.toFixed(2)} {item.toUnit}
                  </div>
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

export default TemperatureConverter;
