import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';

import Channels from './Channels';
import Messages from './Messages';

import { setCurrentChannelId, addChannels } from '../slices/channelsSlice';
import { addMessages } from '../slices/messagesSlice';

const getAuthHeader = () => {
  const userToken = localStorage.getItem('userToken');

  return userToken ? { Authorization: `Bearer ${userToken}` } : {};
};

const ChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get('api/v1/data', { headers: getAuthHeader() });

      dispatch(addChannels(data.channels));
      dispatch(addMessages(data.messages));
      dispatch(setCurrentChannelId(data.currentChannelId));
    };

    fetchContent();
  }, [dispatch]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default ChatPage;
