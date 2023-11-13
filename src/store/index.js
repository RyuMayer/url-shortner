import { configureStore } from '@reduxjs/toolkit';

import linkReducer from './slice/linkSlice';

const store = configureStore({
  reducer: {
    links: linkReducer
  }
});

export {store};
