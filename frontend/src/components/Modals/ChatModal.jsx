import { useSelector } from 'react-redux';
import modalSelectors from '../../selectors/modalSelectors';
import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

const ChatModal = () => {
  const modalType = useSelector(modalSelectors.selectType);
  const isModalOpen = useSelector(modalSelectors.selectIsOpen);

  const modals = {
    add: Add,
    remove: Remove,
    rename: Rename,
  };

  const Component = modals[modalType];

  return isModalOpen ? <Component /> : null;
};

export default ChatModal;
