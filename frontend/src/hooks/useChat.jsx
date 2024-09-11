import { useContext } from 'react';
import ChatContext from '../contexts/ChatContext';

const useChat = () => useContext(ChatContext);

export default useChat;
