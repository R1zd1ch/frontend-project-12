import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors as channelsSelectors } from '../slices/channelsSlice';
import { selectors as messagesSelectors } from '../slices/messagesSlice';

const MessagesHeader = () => {
  const { t } = useTranslation();
  const messages = useSelector(messagesSelectors.selectAll);
  const id = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = useSelector((state) => channelsSelectors.selectById(state, id));

  const messagesCount = messages ? messages.filter((m) => m.channelId === id).length : 0;

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{t('channels.channelName', { name: currentChannel.name })}</b>
      </p>
      <span className="text-muted">{t('chat.messageCount', { count: messagesCount })}</span>
    </div>
  );
};

export default MessagesHeader;
