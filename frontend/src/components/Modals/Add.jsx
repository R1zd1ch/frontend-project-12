import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../../slices/channelsSlice';
import { close } from '../../slices/modalSlice';
import useChat from '../../hooks/useChat';

const Add = () => {
  const dispatch = useDispatch();
  const chat = useChat();

  const isOpen = useSelector((state) => state.modal.isOpen);
  const channels = useSelector(channelsSelectors.selectAll);
  const channelsNames = channels.map(({ name }) => name);

  const nameInput = useRef(null);
  useEffect(() => {
    nameInput.current.focus();
  }, []);

  const handleClose = () => dispatch(close());

  const validationSchema = yup.object.shape({
    name: yup
      .string()
      .trim()
      .required()
      .min(3, 'от 3 до 20 символов')
      .max(20, 'от 3 до 20 символов')
      .notOneOf(channelsNames, 'Название должно быть уникальным'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      chat.createChannel(values.name);
      handleClose();
    },
  });

  const isNameInvalid = formik.errors.name && formik.touched.name;

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Control
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            name="name"
            aria-label="Имя канала"
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
            Отменить
          </Button>
          <Button variant="primary" type="submit">
            Отправить
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Add;
