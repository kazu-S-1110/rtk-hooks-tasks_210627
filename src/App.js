import React from 'react';
import styles from './App.module.css';
import { FaSignInAlt } from 'react-icons/fa';

function App() {
  const Logout = () => {
    localStorage.removeItem('localJWT');
    window.location.href = '/';
  };

  return (
    <div className={styles.containerTasks}>
      <div className={styles.appTasks}>
        <button className={styles.signBtn} onClick={Logout}>
          <FaSignInAlt />
        </button>
      </div>
      <div className={styles.appDetails}></div>
    </div>
  );
}

export default App;
