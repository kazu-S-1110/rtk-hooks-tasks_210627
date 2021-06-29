import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://api-rtk-task-r210629.herokuapp.com/';
const token = localStorage.localJWT;

const initialState = {
  tasks: [
    {
      id: 0,
      title: '',
      created_at: '',
      updated_at: '',
    },
  ],
  editedTask: {
    id: 0,
    title: '',
    created_at: '',
    updated_at: '',
  },
  selectedTask: {
    id: 0,
    title: '',
    created_at: '',
    updated_at: '',
  },
};

//非同期のreducerは４つ、新規作成、一覧取得、更新、削除

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    editTask(state, action) {
      state.editedTask = action.payload;
    },
    selectTask(state, action) {
      state.selectedTask = action.payload;
    },
  },
});
