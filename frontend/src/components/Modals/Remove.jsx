import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { close } from '../../slices/modalSlice';
import modalSelectors from '../../selectors/modalSelectors';
import useChat from '../../hooks/useChat';

const Remove = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();

  const [isSubmitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();
  const chat = useChat();

  const isOpen = useSelector(modalSelectors.selectIsOpen);
  const channelId = useSelector(modalSelectors.selectItemId);

  const handleClose = () => dispatch(close());
  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await chat.deleteChannel(channelId);
      setSubmitting(false);
      toast.success(t('channels.removed'));
      handleClose();
    } catch (err) {
      rollbar.error('Error while removing channel', err);
      setSubmitting(false);
      console.error(err);
      toast.error(t('errors.network'));
    }
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
      </Modal.Body>
      <fieldset disabled={isSubmitting}>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('modals.cancel')}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {t('modals.confirm')}
          </Button>
        </Modal.Footer>
      </fieldset>
    </Modal>
  );
};

export default Remove;
