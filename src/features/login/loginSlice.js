import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:8000/';

const initialState = {
  authen: {
    username: '',
    password: '',
  },
  isLoginView: true,
  profile: {
    id: 0,
    username: '',
  },
};

export const fetchAsyncLogin = createAsyncThunk('login/post', async (auth) => {
  const res = await axios.post(`${apiUrl}authen/jwt/create`, auth, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
});

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    editUsername(state, action) {
      state.authen.username = action.payload;
    },
    editPassword(state, action) {
      state.authen.password = action.payload;
    },
    toggleMode(state) {
      state.isLoginView = !state.isLoginView;
    },
  },
});
