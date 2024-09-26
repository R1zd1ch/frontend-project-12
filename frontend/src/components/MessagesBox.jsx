import ScrollToBottom from 'react-scroll-to-bottom';
import { useSelector } from 'react-redux';
import messagesSelectors from '../selectors/messagesSelectors';

const MessagesBox = () => {
  const messages = useSelector(messagesSelectors.selectCurrentChannelMessages);

  return (
    <ScrollToBottom
      className="chat-messages overflow-auto px-5"
      id="messages-box"
      followButtonClassName="follow-button"
    >
      {messages.map(({ body, username, id }) => (
        <div key={id} className="text-break mb-2">
          <b>{username}</b>
          {`: ${body}`}
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default MessagesBox;
