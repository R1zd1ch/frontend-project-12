import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { close } from '../../slices/modalSlice';
import useChat from '../../hooks/useChat';

const Remove = () => {
  const { t } = useTranslation();
  const dispath = useDispatch();
  const chat = useChat();

  const isOpen = useSelector((state) => state.modal.isOpen);
  const channelId = useSelector((state) => state.modal.item.id);

  const handleClose = () => dispath(close());
  const handleDelete = () => {
    chat.deleteChannel(channelId);
    handleClose();
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('modals.cancel')}
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          {t('modals.confirm')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
