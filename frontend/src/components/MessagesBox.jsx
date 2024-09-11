import { useSelector } from 'react-redux';

import { selectors as messagesSelectors } from '../slices/messagesSlice';

const MessagesBox = () => {
  const messages = useSelector(messagesSelectors.selectAll);
  const channelId = useSelector((state) => state.channels.currentChannelId);
  messages.filter((m) => {
    console.log(m);
    console.log(`m.channelId: ${m.channelId}`);
    console.log(`channelId: ${channelId}`);
    return m.channelId !== channelId;
  });

  // prettier-ignore
  return (
    <div className="chat-messages overflow-auto px-5" id="messages-box">
      {messages
        && messages
          .filter((m) => m.channelId === channelId)
          .map(({ body, username, id }) => (
            <div key={id} className="text-break mb-2">
              <b>{username}</b>
              {`: ${body}`}
            </div>
          ))}
    </div>
  );
};

export default MessagesBox;
