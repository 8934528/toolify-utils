import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../../hooks/useSession';
import './Unavailable.css';

const Unavailable: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const { session } = useSession();

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getLinkWithSession = (path: string) => {
    return session ? `${path}?session=${session.id}` : path;
  };

  return (
    <div className="unavailable-page">
      <div className="unavailable-container">
        <div className="unavailable-content">
          <div className="icon-wrapper">
            <i className="fi fi-rr-construction"></i>
          </div>

          <h1 className="title">Service Unavailable</h1>
          <p className="subtitle">
            We're currently working on improving this tool. Please check back soon!
          </p>

          <div className="progress-container">
            <div className="progress-bar-wrapper">
              <div className="progress-fill progress-fill-79"></div>
            </div>
            <span className="progress-text">Update in progress (79%)</span>
          </div>

          <div className="countdown">
            <h3>Estimated time until completion:</h3>
            <div className="countdown-grid">
              <div className="countdown-item">
                <span className="countdown-number">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="countdown-label">Days</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="countdown-label">Hours</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="countdown-label">Minutes</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="countdown-label">Seconds</span>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <Link to={getLinkWithSession('/')} className="btn-primary">
              <i className="fi fi-rr-home"></i>
              Return Home
            </Link>
            <a href="mailto:support@toolify-utils.com" className="btn-secondary">
              <i className="fi fi-rr-envelope"></i>
              Contact Support
            </a>
          </div>
        </div>

        <div className="background-animation">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Unavailable;
