import { useSelector } from 'react-redux';

import { selectors as messagesSelectors } from '../slices/messagesSlice';

const MessagesBox = () => {
  const messages = useSelector(messagesSelectors.selectAll);

  return (
    <div className="chat-messages overflow-auto px-5" id="messages-box">
      {messages && <p>{`messages: ${messages}`}</p>}
      {/* {messages && messages.map((message) => <p>{message}</p>)} */}
    </div>
  );
};

export default MessagesBox;
