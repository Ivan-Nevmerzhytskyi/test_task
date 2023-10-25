import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './common/styles/index.scss';
import { TopBar } from './common/components/TopBar';

export const App: React.FC = () => {
  useEffect(() => {
    document.documentElement.classList.add('page');
  }, []);

  return (
    <div className="page__content container">
      <TopBar />
      <Outlet />
    </div>
  );
};
