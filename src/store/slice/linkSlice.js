import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { API_BASE_URL } from '../../config';

const createShortLink = createAsyncThunk(
  'links/createShortLink',
  async (data) => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      body: data
    });

    if (!response.ok) {
      throw new Error('Bad request');
    }

    return await response.json();

  }
);

const initialState = {
  items: [],
  loading: 'idle'
};

const linkSlice = createSlice({
  name: 'links',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createShortLink.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(createShortLink.fulfilled, (state, action) => {
        const {result_url} = action.payload;

        state.items.push(result_url);
        state.loading = 'idle';

      })
      .addCase(createShortLink.rejected, (state) => {
        state.loading = 'rejected';
      });
  }
});

export {createShortLink};
export default linkSlice.reducer;
