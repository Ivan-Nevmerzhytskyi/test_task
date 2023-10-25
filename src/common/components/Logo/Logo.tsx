import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.scss';

export const Logo: React.FC = React.memo(() => {
  return (
    <Link
      to="/home"
      className="logo logo__link"
    >
      <img src="favicon.ico" alt="logo" className="logo__img" />
    </Link>
  );
});
