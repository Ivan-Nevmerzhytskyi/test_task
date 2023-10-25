import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './Nav.scss';
import { AuthContext } from '../../../store/AuthContext';

export const Nav: React.FC = React.memo(() => {
  const { user } = useContext(AuthContext);

  const navLinks = [
    {
      href: '/',
      linkText: 'Home',
    },
    {
      href: '/user/table',
      linkText: user ? user.username : 'Account',
    },
  ];

  return (
    <nav className="nav">
      <ul
        className="nav__list"
      >
        {navLinks.map(({ href, linkText }) => (
          <li
            key={linkText}
            className="nav__item"
          >
            <NavLink
              to={href}
              // end
              className={({ isActive }) => classNames(
                'nav__link',
                {
                  'nav__link--is-active': isActive,
                },
              )}
            >
              {linkText}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
});
