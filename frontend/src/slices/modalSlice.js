/* eslint no-param-reassign: ["error", { "props": true,
"ignorePropertyModificationsFor": ["state"] }] */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: null,
  item: null,
};

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, { payload: { type, item = null } }) => {
      state.isOpen = true;
      state.type = type;
      state.item = item;
    },
    close: (state) => {
      state.isOpen = false;
      state.type = null;
      state.item = null;
    },
  },
});

export const { open, close } = slice.actions;

export default slice.reducer;
