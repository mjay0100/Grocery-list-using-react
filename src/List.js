import React, { useState, useEffect } from 'react';
import './style.css';

export default function App({ list, clearItem, editItem }) {
  return (
    <div className="grocery-list">
      {list.map((item) => {
        const { id, title } = item;
        return (
          <article className="grocery-item" key={id}>
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <i class="fa-solid fa-pen-nib"></i>
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => clearItem(id)}
              >
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
