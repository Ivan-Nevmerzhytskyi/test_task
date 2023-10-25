import React from 'react';
import './HomePage.scss';

export const HomePage: React.FC = React.memo(() => {
  return (
    <main className="homePage">
      {/* ↑ responsible for the background */}
      <div className="container">
        {/* ↑ responsible for horizontal constraints */}
        <section className="homePage__content">
          {/* ↑ responsible for the internal filling */}
          <h1 className="homePage__title">
            How to use this site?
          </h1>
          <p className="homePage__description">
            You must log in to access the data.
            To do this, you need to go to the &quot;ACCOUNT&quot; link
            and enter the correct login and password.
          </p>
        </section>
      </div>
    </main>
  );
});
