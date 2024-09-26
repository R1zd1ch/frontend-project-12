import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import leoProfanity from 'leo-profanity';
import useAuth from '../hooks/useAuth';
import useChat from '../hooks/useChat';
import channelsSelectors from '../selectors/channelsSelectors';

const MessagesForm = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const auth = useAuth();
  const chat = useChat();

  const channelId = useSelector(channelsSelectors.selectCurrentChannelId);

  const validationSchema = yup.object().shape({
    body: yup.string().trim().required(t('chat.required')),
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: async ({ body }, { setSubmitting }) => {
      const cleanBody = leoProfanity.clean(body);
      const message = {
        body: cleanBody,
        channelId,
        username: auth.username,
      };
      try {
        await chat.sendMessage(message);
        formik.resetForm();
      } catch (err) {
        rollbar.error('Error while sending a message', err);
        setSubmitting(false);
        console.error(err);
        toast.error(t('errors.network'));
      }
    },
  });

  const messageInput = useRef(null);
  useEffect(() => {
    messageInput.current.focus();
  }, [channelId, formik.isSubmitting]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <fieldset disabled={formik.isSubmitting}>
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
              className="btn-group-vertical btn-send"
              disabled={Boolean(formik.errors.body)}
            >
              <ArrowRightSquare size={20} />
              <span className="visually-hidden">{t('chat.send')}</span>
            </Button>
          </InputGroup>
        </fieldset>
      </Form>
    </div>
  );
};

export default MessagesForm;
