import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
  },
});

export const { addMessages } = slice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);

export default slice.reducer;
