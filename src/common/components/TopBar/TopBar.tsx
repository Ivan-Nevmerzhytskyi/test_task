import React from 'react';
import './TopBar.scss';
import { Logo } from '../Logo';
import { Nav } from '../Nav';

export const TopBar: React.FC = React.memo(() => {
  return (
    <div className="topBar topBar--sticky">
      <Logo />
      <Nav />
      <div />
    </div>
  );
});
