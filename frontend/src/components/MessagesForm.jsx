import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';
import useChat from '../hooks/useChat';

const MessagesForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const chat = useChat();

  const channelId = useSelector((state) => state.channels.currentChannelId);

  const messageInput = useRef(null);
  useEffect(() => {
    messageInput.current.focus();
  }, [channelId]);

  const validationSchema = yup.object().shape({
    body: yup.string().trim().required(t('chat.required')),
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: ({ body }) => {
      const message = {
        body,
        channelId,
        username: auth.username,
      };
      chat.sendMessage(message);
      formik.resetForm();
      messageInput.current.focus();
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <InputGroup>
          <Form.Control
            type="text"
            onChange={formik.handleChange}
            value={formik.values.body}
            onBlur={formik.handleBlur}
            name="body"
            aria-label={t('chat.newMessage')}
            className="border-0 p-0 ps-2"
            required
            ref={messageInput}
          />
          <Button
            variant=""
            type="submit"
            className="btn-group-vertical"
            disabled={Boolean(formik.errors.body)}
          >
            <ArrowRightSquare size={20} />
            <span className="visually-hidden">{t('chat.send')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessagesForm;
