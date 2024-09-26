import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import channelsSelectors from '../selectors/channelsSelectors';
import messagesSelectors from '../selectors/messagesSelectors';

const MessagesHeader = () => {
  const { t } = useTranslation();
  const currentChannel = useSelector(channelsSelectors.selectCurrentChannel);
  const messagesCount = useSelector(messagesSelectors.selectMessagesCount);
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
