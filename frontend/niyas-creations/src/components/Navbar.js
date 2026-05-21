import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        backgroundColor: '#f5f5f5'
      }}
    >
      <h2>Niya's Creations</h2>

      <div style={{ display: 'flex', gap: '15px' }}>
        
        <Link to="/login">
        login
        </Link>

        <Link to="/register">
         register
        </Link>

      </div>
    </div>
  );
}