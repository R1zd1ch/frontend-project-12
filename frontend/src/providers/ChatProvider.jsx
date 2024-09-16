import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slices/messagesSlice';
import {
  addChannel,
  removeChannel,
  updateChannelName,
  setCurrentChannelId,
} from '../slices/channelsSlice';
import ChatContext from '../contexts/ChatContext';

const ChatProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const context = useMemo(() => {
    const connect = () => {
      socket.connect();

      socket.on('newMessage', (message) => {
        dispatch(addMessage(message));
      });

      socket.on('newChannel', (channel) => {
        dispatch(addChannel(channel));
        dispatch(setCurrentChannelId(channel.id));
      });

      socket.on('removeChannel', ({ id }) => {
        dispatch(removeChannel(id));
      });

      socket.on('renameChannel', ({ id, name }) => {
        dispatch(updateChannelName({ id, changes: { name } }));
      });
    };

    const disconnect = () => {
      socket.off();
      socket.disconnect();
    };

    const sendMessage = async (message) => {
      await socket.timeout(3000).emitWithAck('newMessage', message);
    };

    const createChannel = async (name) => {
      await socket.timeout(3000).emitWithAck('newChannel', { name });
    };

    const deleteChannel = async (id) => {
      await socket.timeout(3000).emitWithAck('removeChannel', { id });
    };

    const renameChannel = async (id, name) => {
      await socket.timeout(3000).emitWithAck('renameChannel', { id, name });
    };

    // prettier-ignore
    return {
      connect,
      disconnect,
      sendMessage,
      createChannel,
      deleteChannel,
      renameChannel,
    };
  }, [dispatch, socket]);

  return <ChatContext.Provider value={context}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
