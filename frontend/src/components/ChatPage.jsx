import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';

import Channels from './Channels';
import Messages from './Messages';

import { setCurrentChannelId, addChannels } from '../slices/channelsSlice';
import { addMessages } from '../slices/messagesSlice';

import useAuth from '../hooks/useAuth';
import useChat from '../hooks/useChat';

const ChatPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const chat = useChat();

  useEffect(() => {
    const fetchContent = async () => {
      const headers = auth.loggedIn ? { Authorization: `Bearer ${auth.token}` } : {};
      const { data } = await axios.get('api/v1/data', { headers });

      dispatch(addChannels(data.channels));
      dispatch(addMessages(data.messages));
      dispatch(setCurrentChannelId(data.currentChannelId));
    };

    fetchContent();
    chat.connect();

    return () => {
      chat.disconnect();
    };
  }, [dispatch, chat, auth]);

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
