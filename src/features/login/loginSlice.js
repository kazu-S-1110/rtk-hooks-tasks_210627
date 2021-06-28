import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

const apiUrl = 'http://localhost:8000/';
const token = localStorage.localJWT;

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

export const fetchAsyncRegister = createAsyncThunk(
  'login/register',
  async (auth) => {
    const res = await axios.post(`${apiUrl}api/register`, auth, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  }
);

export const fetchAsyncProf = createAsyncThunk('login/get', async () => {
  const res = await axios.get(`${apiUrl}api/myself/`, {
    headers: {
      Authorization: `JWT ${token}`,
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

  //非同期関数の挙動（fulfilled,rejected,prevented）を定義できるのがextraReducers
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem('localJWT', action.payload.access);
      action.payload.access && (window.location.href = '/tasks'); //accessキーがあればtasksに飛ぶよう論理積を定義。
    });
    builder.addCase(fetchAsyncProf.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export const { editUsername, editPassword, toggleMode } = loginSlice.actions;
