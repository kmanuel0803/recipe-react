// paginationActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../axios.client'; // Adjust the path as needed

export const fetchPaginatedData = createAsyncThunk(
  'pagination/fetchPaginatedData',
  async ({ endpoint, page, pageSize }: { endpoint: string, page: number; pageSize: number }, thunkAPI) => {
    try {
      const response = await axiosClient.get(`${endpoint}?page=${page}&limit=${pageSize}`);
      return {
        recipes: response.data.recipes,
        totalPages: Math.ceil(response.data.total / pageSize),
        currentPage: page,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch data');
    }
  }
);
