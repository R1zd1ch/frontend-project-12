import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../slices/messagesSlice';
import { addChannel, removeChannel, updateChannelName } from '../slices/channelsSlice';
import ChatContext from '../contexts/ChatContext';

const ChatProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const context = useMemo(() => {
    const connect = () => {
      socket.connect();

      socket.on('newMessage', (message) => {
        console.log(message);
        dispatch(addMessage(message));
      });

      socket.on('newChannel', (channel) => {
        console.log(channel);
        dispatch(addChannel(channel));
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

    const sendMessage = (message) => {
      socket.emit('newMessage', message);
    };

    const createChannel = (name) => {
      socket.emit('newChannel', { name });
    };

    const deleteChannel = (id) => {
      socket.emit('removeChannel', { id });
    };

    const renameChannel = (id, name) => {
      socket.emit('renameChannel', { id, name });
    };

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
