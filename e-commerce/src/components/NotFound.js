import React from 'react';
import {NavLink} from 'react-router-dom';

function NotFound() {
  return (
    <div className = "mt-5 text-center notFound">
      <h1 className = "mt-5 text-center">404 - Page Not Found</h1>
      <p>Go back to the <NavLink to="/">homepage</NavLink>.</p>
    </div>
  );
}

export default NotFound;
