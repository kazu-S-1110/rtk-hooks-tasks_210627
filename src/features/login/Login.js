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

  return <div>Hello login</div>;
};

export default Login;
