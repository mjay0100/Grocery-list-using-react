import React, { useState, useEffect } from 'react';
import './style.css';

export default function App({ msg, type, list, removeAlert }) {
  useEffect(() => {
    const time = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => {
      clearTimeout(time);
    };
  }, [list]);
  return (
    <section>
      <p className={`alert alert-${type}`}>{msg}</p>
    </section>
  );
}
