import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
});

const slice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = payload;
    },
    addChannels: channelsAdapter.addMany,
  },
});

export const { setCurrentChannelId, addChannels } = slice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default slice.reducer;
