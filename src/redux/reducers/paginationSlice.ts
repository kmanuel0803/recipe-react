import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPaginatedData } from '../actions/paginationActions';
import { RecipeType } from '../../models/Recipe';

interface PaginationState {
  recipes: RecipeType[];
  currentPage: number;
  totalPages: number;
  error: string | null;
}

const initialState: PaginationState = {
  recipes: [],
  currentPage: 1,
  totalPages: 0,
  error: null,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaginatedData.fulfilled, (state, action: PayloadAction<{ recipes: RecipeType[], totalPages: number, currentPage: number }>) => {
        state.recipes = action.payload.recipes;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.error = null;
      })
      .addCase(fetchPaginatedData.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default paginationSlice.reducer;
