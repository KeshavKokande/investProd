import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Determine the role based on the URL
  const isClient = location.pathname.includes('/client');
  const isAdvisor = location.pathname.includes('/advisor_dashboard');

  const homeUrl = isClient ? '/client/client_dashboard' : isAdvisor ? '/advisor_dashboard' : '/';

  const customLabels = {
    'plansList': 'Plans List',
    // Add more custom labels as needed
  };

  // If the path is exactly "/client/client_dashboard", only show "Home"
  if (location.pathname === '/client/client_dashboard') {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={homeUrl}>Home</Link>
          </li>
        </ol>
      </nav>
    );
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to={homeUrl}>Home</Link>
        </li>
        {pathnames
          .filter((value) => value !== 'client') // Filter out "client"
          .map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const label = customLabels[value] || value;

            return (
              <li className={`breadcrumb-item ${isLast ? 'active' : ''}`} key={to} aria-current={isLast ? 'page' : undefined}>
                {isLast ? (
                  label
                ) : (
                  <Link to={to}>{label}</Link>
                )}
              </li>
            );
          })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;