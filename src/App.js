import React, { useState, useEffect } from 'react';
import './style.css';
import List from './List';
import Alert from './Alert';
import { v4 as uuidv4 } from 'uuid';

const Local_Storage_key = 'Grocery';

export default function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  //persistent data
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(Local_Storage_key));
    if (storedItems) setList(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem(Local_Storage_key, JSON.stringify(list));
  }, [list]);

  //handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'please enter an item', 'danger');
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setIsEditing(false);
      setEditId(null);
      showAlert(true, 'item successfully edited', 'success');
    } else {
      const newList = { id: uuidv4(), title: name };
      setList([...list, newList]);
      showAlert(true, 'item successfully added', 'success');
      setName('');
    }
  };

  //clear a single item from list
  const clearItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    showAlert(true, 'removed item', 'danger');
    setList(newList);
  };

  //edits item with specific id
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  //shows alert notifications
  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type });
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3 id="main-title">My List</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List list={list} clearItem={clearItem} editItem={editItem} />
          <button
            onClick={() => {
              showAlert(true, 'items successfully deleted', 'danger');
              setList([]);
            }}
            className="clear-btn"
          >
            clear items
          </button>
        </div>
      )}
    </section>
  );
}
