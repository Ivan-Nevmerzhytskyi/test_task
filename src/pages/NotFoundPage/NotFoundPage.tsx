import React from 'react';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = React.memo(() => (
  <section className="notFoundPage">
    <div className="container">
      <h1 className="notFoundPage__title">
        Page not found
      </h1>
    </div>
  </section>
));
