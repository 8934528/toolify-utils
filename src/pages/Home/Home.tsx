import React from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../../hooks/useSession';
import './Home.css';

const Home: React.FC = () => {
  const { session } = useSession();

  const tools = [
    {
      path: '/calculator',
      icon: 'fi fi-rr-calculator',
      title: 'Calculator',
      description: 'Perform quick math calculations with our easy-to-use calculator.',
      color: 'primary'
    },
    {
      path: '/temperature',
      icon: 'fi fi-rr-temperature-high',
      title: 'Temperature Converter',
      description: 'Convert between Celsius, Fahrenheit & Kelvin instantly.',
      color: 'accent'
    },
    {
      path: '/todo',
      icon: 'fi fi-rr-list-check',
      title: 'To-Do List',
      description: 'Organize and manage your daily tasks efficiently.',
      color: 'success'
    }
  ];

  const getLinkWithSession = (path: string) => {
    return session ? `${path}?session=${session.id}` : path;
  };

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title fade-in">
            Welcome to <span className="text-gradient">Toolify-Utils</span>
          </h1>
          <p className="hero-subtitle fade-in">
            Your all-in-one collection of smart, efficient, and easy-to-use tools
          </p>
        </div>
      </div>

      <div className="tools-section">
        <h2 className="section-title">Available Tools</h2>
        <div className="tools-grid">
          {tools.map((tool, index) => (
            <Link
              key={tool.path}
              to={getLinkWithSession(tool.path)}
              className={`tool-card tool-card-${tool.color} fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="tool-icon-wrapper">
                <i className={tool.icon}></i>
              </div>
              <h3 className="tool-title">{tool.title}</h3>
              <p className="tool-description">{tool.description}</p>
              <span className="tool-link">
                Open Tool <i className="fi fi-rr-arrow-right"></i>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-item fade-in">
            <div className="stat-value">3+</div>
            <div className="stat-label">Useful Tools</div>
          </div>
          <div className="stat-item fade-in">
            <div className="stat-value">100%</div>
            <div className="stat-label">Free to Use</div>
          </div>
          <div className="stat-item fade-in">
            <div className="stat-value">24/7</div>
            <div className="stat-label">Availability</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
