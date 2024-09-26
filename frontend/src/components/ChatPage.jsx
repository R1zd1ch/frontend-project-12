import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import routes from '../routes';
import Channels from './Channels';
import Messages from './Messages';
import ChatModal from './Modals/ChatModal';
import { setCurrentChannelId, addChannels } from '../slices/channelsSlice';
import { addMessages } from '../slices/messagesSlice';
import useAuth from '../hooks/useAuth';
import useChat from '../hooks/useChat';

const ChatPage = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();

  const dispatch = useDispatch();
  const auth = useAuth();
  const chat = useChat();

  const [isFetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setFetching(true);
        const { headers } = auth;
        const { data } = await axios.get(routes.dataApi(), { headers });

        dispatch(addChannels(data.channels));
        dispatch(addMessages(data.messages));
        dispatch(setCurrentChannelId(data.currentChannelId));
        setFetching(false);
      } catch (err) {
        if (!err.isAxiosError) {
          rollbar.error('Unknown error while trying to fetch initial data', err);
          toast.error(t('errors.unknown'));
          return;
        }

        if (err.response?.status === 401) {
          auth.logOut();
          return;
        }

        rollbar.error('Network error while trying to fetch initial data', err);
        toast.error(t('errors.network'));
      }
    };

    fetchContent();
    chat.connect();

    return () => {
      chat.disconnect();
    };
  }, [dispatch, chat, auth, t, rollbar]);

  return isFetching ? (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">{t('loading')}</span>
      </Spinner>
    </div>
  ) : (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      </Container>
      <ChatModal />
    </>
  );
};

export default ChatPage;
