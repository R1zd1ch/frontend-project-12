/* eslint no-param-reassign: ["error", { "props": true,
"ignorePropertyModificationsFor": ["state"] }] */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({ currentChannelId: null });

const slice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        const newId = state.ids[0];
        state.currentChannelId = newId;
      }
      channelsAdapter.removeOne(state, payload);
    },
    updateChannelName: channelsAdapter.updateOne,
  },
});

// prettier-ignore
export const {
  setCurrentChannelId,
  addChannels,
  addChannel,
  removeChannel,
  updateChannelName,
} = slice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export default slice.reducer;
