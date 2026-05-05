import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useSession } from '../../hooks/useSession';
import './Home.css';

const ToolCard = ({ tool, index, getLinkWithSession }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12.5deg", "-12.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12.5deg", "12.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      className="col-12 col-md-6 col-xl-4 tool-card-container"
    >
      <Link
        to={getLinkWithSession(tool.path)}
        className={`tool-card glass-panel`}
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="tool-icon-wrapper" style={{ transform: "translateZ(40px)" }}>
          <i className={tool.icon}></i>
        </div>
        <h3 className="tool-title" style={{ transform: "translateZ(35px)" }}>{tool.title}</h3>
        <p className="tool-description" style={{ transform: "translateZ(20px)" }}>{tool.description}</p>
        <span className="tool-link" style={{ transform: "translateZ(40px)" }}>
          Open Tool <i className="fi fi-rr-arrow-right"></i>
        </span>
      </Link>
    </motion.div>
  );
};

const Home: React.FC = () => {
  const { session } = useSession();

  const tools = [
    {
      path: '/calculator',
      icon: 'fi fi-rr-calculator',
      title: 'Calculator',
      description: 'Perform quick math calculations with our easy-to-use calculator.',
    },
    {
      path: '/temperature',
      icon: 'fi fi-rr-temperature-high',
      title: 'Temperature Converter',
      description: 'Convert between Celsius, Fahrenheit & Kelvin instantly.',
    },
    {
      path: '/todo',
      icon: 'fi fi-rr-list-check',
      title: 'To-Do List',
      description: 'Organize and manage your daily tasks efficiently.',
    }
  ];

  const getLinkWithSession = (path: string) => {
    return session ? `${path}?session=${session.id}` : path;
  };

  return (
    <div className="home">
      <div className="tools-section container">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <h2 className="section-title">Dashboard</h2>
          <p className="section-subtitle">Overview of available tools</p>
        </motion.div>
        
        <div className="row g-4 align-items-start">
          <div className="col-12 col-lg-9">
            <div className="row g-4">
              {tools.map((tool, index) => (
                <ToolCard key={tool.path} tool={tool} index={index} getLinkWithSession={getLinkWithSession} />
              ))}
            </div>
          </div>

          <div className="col-12 col-lg-3">
            <div className="stats-section">
              <div className="stats-grid">
                {[
                  { value: '3+', label: 'Useful Tools' },
                  { value: '100%', label: 'Free to Use' },
                  { value: '24/7', label: 'Availability' },
                ].map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    className="stat-item glass-panel"
                  >
                    <div className="stat-value text-primary">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
