import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSuggestion = createAsyncThunk(
  'suggestion/fetchSuggestion', // Action type
  async () => {
    const response = await fetch('http://localhost:3004/api/suggestion');
    if (!response.ok) {
      throw new Error('Failed to fetch suggestion');
    }
    return response.json(); 
  }
);

const initialState = {
  suggestion: '',
  loading: false,
  error: true,
};

const options = {
  name: 'suggestion',
  initialState,
  reducers: {},
  extraReducers: {
    /* Task 16: Inside `extraReducers`, add reducers to handle all three promise lifecycle states - pending, fulfilled, and rejected - for the `fetchSuggestion()` call */
    [fetchSuggestion.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchSuggestion.fulfilled]: (state, { payload }) => {
      console.log('Fetched suggestion:', payload);
      state.suggestion = payload.data;
      state.loading = false;
      state.error = false;
    },
    [fetchSuggestion.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

// Task 17: Create a selector, called `selectSuggestion`, for the `suggestion` state variable and export it from the file
export const selectSuggestion = (state) => state.suggestion.suggestion;

export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
