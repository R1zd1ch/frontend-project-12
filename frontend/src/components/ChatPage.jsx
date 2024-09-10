import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import {
  selectors as channelSelectors,
  setCurrentChannelId,
  addChannels,
} from '../slices/channelsSlice.js';
import { selectors as messagesSelectors, addMessages } from '../slices/messagesSlice.js';

const getAuthHeader = () => {
  const userToken = localStorage.getItem('userToken');

  return userToken ? { Authorization: `Bearer ${userToken}` } : {};
};

const ChatPage = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get('api/v1/data', { headers: getAuthHeader() });
      console.log(data);
      dispatch(addChannels(data.channels));
      dispatch(addMessages(data.messages));
      dispatch(setCurrentChannelId(data.currentChannelId));
    };

    fetchContent();
  }, [dispatch]);

  return (
    <>
      {channels && <p>{`channels: ${channels}`}</p>}
      {messages && <p>{`messages ${messages}`}</p>}
      {currentChannelId && <p>{`Current channel id: ${currentChannelId}`}</p>}
    </>
  );
};

export default ChatPage;
