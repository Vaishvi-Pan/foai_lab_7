import React from 'react';
import './Card.css';

export function Card({ title, children, actions }) {
  return (
    <div className="card fade-in">
      {title && <h2 className="card-title">{title}</h2>}
      <div className="card-content">
        {children}
      </div>
      {actions && (
        <div className="card-actions">
          {actions}
        </div>
      )}
    </div>
  );
}
