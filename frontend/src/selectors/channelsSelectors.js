import { selectors } from '../slices/channelsSlice';
const channelsSelectors = {
  ...selectors,
  selectCurrentChannelId: (state) => state.channels.currentChannelId,
  selectCurrentChannel: (state) => {
    const id = state.channels.currentChannelId;
    return selectors.selectById(state, id);
  },
  selectChannelsNames: (state) => {
    const channels = Object.values(state.channels.entities);
    return channels.map(({ name }) => name);
  },
};
export default channelsSelectors;
