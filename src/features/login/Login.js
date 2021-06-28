import React from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Login.module.css';

import {
  editPassword,
  editUsername,
  toggleMode,
  fetchAsyncLogin,
  fetchAsyncRegister,
  selectAuthen,
  selectIsLoginView,
} from './loginSlice';

const Login = () => {
  const dispatch = useDispatch();
  const authen = useSelector(selectAuthen);
  const isLoginView = useSelector(selectIsLoginView);
  //usernameとpasswordどちらかが空文字であるかの判別式
  const btnDisabler = authen.username === '' || authen.password === '';

  return (
    <div className={styles.containerLogin}>
      <div className={styles.appLogin}>
        <h1>{isLoginView ? 'Login' : 'Register'}</h1>
        <span>Username</span>
        <input
          type="text"
          name="username"
          placeholder="input your username"
          className={styles.inputLog}
          onChange={(e) => dispatch(editUsername(e.target.value))}
          required
        />
        <span>Password</span>
        <input
          type="password"
          className={styles.inputLog}
          name="password"
          placeholder="input your password"
          onChange={(e) => dispatch(editPassword(e.target.value))}
          required
        />
        <div className={styles.switch}>
          <Button
            variant="contained"
            disabled={btnDisabler}
            color="primary"
            onClick={login}
          >
            {isLoginView ? 'Login' : 'Create'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
