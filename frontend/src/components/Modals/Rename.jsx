import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { selectors as channelsSelectors } from '../../slices/channelsSlice';
import { close } from '../../slices/modalSlice';
import useChat from '../../hooks/useChat';

const Rename = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const chat = useChat();

  const isOpen = useSelector((state) => state.modal.isOpen);
  const channels = useSelector(channelsSelectors.selectAll);
  const channelsNames = channels.map(({ name }) => name);
  const channelId = useSelector((state) => state.modal.item.id);
  const channelName = useSelector((state) => state.modal.item.name);

  const handleClose = () => dispatch(close());

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('modals.required'))
      .min(3, t('modals.min'))
      .max(20, t('modals.max'))
      .notOneOf(channelsNames, t('modals.uniq'))
      .notOneOf(leoProfanity.list(), t('modals.profanity')),
  });

  const formik = useFormik({
    initialValues: {
      name: channelName,
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await chat.renameChannel(channelId, values.name);
        toast.success(t('channels.renamed'));
        handleClose();
      } catch (err) {
        setSubmitting(false);
        console.error(err);
        toast.error(t('errors.network'));
      }
    },
  });

  const nameInput = useRef(null);
  useEffect(() => {
    nameInput.current.select();
  }, [formik.isSubmitting]);

  const isNameInvalid = formik.errors.name && formik.touched.name;

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <fieldset disabled={formik.isSubmitting}>
          <Modal.Body>
            <Form.Control
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              name="name"
              aria-label={t('modals.editChannelName')}
              className="mb-2"
              isInvalid={isNameInvalid}
              required
              ref={nameInput}
            />
            <Form.Control.Feedback type="invalid" className="invalid-feedback">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {t('modals.cancel')}
            </Button>
            <Button variant="primary" type="submit">
              {t('modals.submit')}
            </Button>
          </Modal.Footer>
        </fieldset>
      </Form>
    </Modal>
  );
};

export default Rename;
