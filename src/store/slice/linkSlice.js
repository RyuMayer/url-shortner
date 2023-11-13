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

    const result = await response.json();

    return {
      data: data.get('url'),
      result
    };
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
        const {data, result: {result_url}} = action.payload;

        state.items.push({
          link: data,
          shortenLink: result_url
        });

        state.loading = 'idle';

      })
      .addCase(createShortLink.rejected, (state) => {
        state.loading = 'rejected';
      });
  }
});

function selectLoading(state) {
  return state.links.loading;
}

function selectLinks(state) {
  return state.links.items;
}

export {createShortLink, selectLinks, selectLoading};
export default linkSlice.reducer;
