import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://api-rtk-task-r210629.herokuapp.com/api/tasks/';
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
export const fetchAsyncGet = createAsyncThunk('task/get', async () => {
  const res = await axios.get(apiUrl, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});

export const fetchAsyncCreate = createAsyncThunk('task/post', async (task) => {
  const res = await axios.post(apiUrl, task, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});

export const fetchAsyncUpdate = createAsyncThunk('task/put', async (task) => {
  const res = await axios.put(`${apiUrl}${task.id}/`, task, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});

export const fetchAsyncDelete = createAsyncThunk('task/delete', async (id) => {
  await axios.delete(`${apiUrl}${id}/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  return id;
});

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
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: action.payload,
      };
    });
    builder.addCase(fetchAsyncCreate.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    });
    builder.addCase(fetchAsyncUpdate.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
        selectedTask: action.payload, //更新後にselectedTaskにpayloadも渡す。
      };
    });
    builder.addCase(fetchAsyncDelete.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
        selectedTask: { id: 0, title: '', created_at: '', updated_at: '' },
      };
    });
  },
});

export const { editTask, selectTask } = taskSlice.actions;

export const selectSelectedTask = (state) => state.task.selectedTask;
export const selectEditedTask = (state) => state.task.editedTask;
export const selectTasks = (state) => state.task.tasks;

export default taskSlice.reducer;
