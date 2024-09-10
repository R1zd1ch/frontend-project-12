import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../slices/channelsSlice';
import { selectors as messagesSelectors } from '../slices/messagesSlice';

const MessagesHeader = () => {
  const messagesCount = useSelector(messagesSelectors.selectTotal);
  const id = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = useSelector((state) => channelsSelectors.selectById(state, id));

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      {currentChannel && (
        <>
          <p className="m-0">
            <b>{`# ${currentChannel.name}`}</b>
          </p>
          <span className="text-muted">{`${messagesCount} сообщений`}</span>
        </>
      )}
    </div>
  );
};

export default MessagesHeader;
