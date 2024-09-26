import { selectors } from '../slices/messagesSlice';

const messagesSelectors = {
  ...selectors,
  selectMessagesCount: (state) => {
    const id = state.channels.currentChannelId;
    const messages = Object.values(state.messages.entities);
    return messages ? messages.filter((m) => m.channelId === id).length : 0;
  },
  selectCurrentChannelMessages: (state) => {
    const id = state.channels.currentChannelId;
    const messages = Object.values(state.messages.entities);
    return messages.filter((message) => message.channelId === id);
  },
};
export default messagesSelectors;
