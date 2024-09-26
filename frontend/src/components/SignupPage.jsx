// prettier-ignore
import {
  Button, Form, Col, Card, Row, Container, Image,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import leoProfanity from 'leo-profanity';
import useAuth from '../hooks/useAuth';
import routes from '../routes';
import signupImg from '../assets/signup.jpg';

const SignupPage = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();

  const auth = useAuth();
  const navigate = useNavigate();

  const [authFailed, setAuthFailed] = useState(false);

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required(t('signup.required'))
      .min(3, t('signup.usernameConstraints'))
      .max(20, t('signup.usernameConstraints'))
      .notOneOf(leoProfanity.list(), t('signup.profanity')),
    password: yup.string().trim().required(t('signup.required')).min(6, t('signup.passMin')),
    confirmPassword: yup
      .string()
      .test(
        'confirmPassword',
        t('signup.mustMatch'),
        (value, context) => value === context.parent.password,
      ),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      setAuthFailed(false);
      try {
        const { username, password } = values;
        const res = await axios.post(routes.signupApi(), { username, password });
        const userData = res.data;
        auth.signUp(userData);
        navigate(routes.chatPage());
      } catch (err) {
        setSubmitting(false);
        console.error(err);
        if (!err.isAxiosError) {
          rollbar.error('Unknown error while trying to signup', err);
          toast.error(t('errors.unknown'));
          return;
        }

        if (err.response?.status === 409) {
          setAuthFailed(true);
          return;
        }

        rollbar.error('Network error while trying to signup', err);
        toast.error(t('errors.network'));
      }
    },
  });

  const usernameInput = useRef(null);
  useEffect(() => {
    usernameInput.current.focus();
  }, [formik.isSubmitting]);
  // With isSubmitting dependency, focus will be on input after sending request

  const isUsernameInvalid = formik.errors.username && formik.touched.username;
  const isPasswordInvalid = formik.errors.password && formik.touched.password;
  const isConfirmPasswordInvalid = formik.errors.confirmPassword && formik.touched.confirmPassword;

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-5 row">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image src={signupImg} alt={t('signup.header')} roundedCircle />
              </Col>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('signup.header')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="mb-3 form-floating" controlId="username">
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setAuthFailed(false);
                        formik.handleChange(e);
                      }}
                      value={formik.values.username}
                      onBlur={formik.handleBlur}
                      placeholder={t('signup.username')}
                      autoComplete="username"
                      required
                      ref={usernameInput}
                      isInvalid={authFailed || isUsernameInvalid}
                    />
                    <Form.Label>{t('signup.username')}</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip={isUsernameInvalid}>
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3 form-floating" controlId="password">
                    <Form.Control
                      type="password"
                      onChange={(e) => {
                        setAuthFailed(false);
                        formik.handleChange(e);
                      }}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      placeholder={t('signup.password')}
                      autoComplete="password"
                      isInvalid={authFailed || isPasswordInvalid}
                      required
                    />
                    <Form.Label>{t('signup.password')}</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip={isPasswordInvalid}>
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4 form-floating" controlId="confirmPassword">
                    <Form.Control
                      type="password"
                      onChange={(e) => {
                        setAuthFailed(false);
                        formik.handleChange(e);
                      }}
                      value={formik.values.confirmPassword}
                      onBlur={formik.handleBlur}
                      placeholder={t('signup.confirm')}
                      autoComplete="password"
                      isInvalid={authFailed || isConfirmPasswordInvalid}
                      required
                    />
                    <Form.Label>{t('signup.confirm')}</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.confirmPassword || t('signup.alreadyExists')}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button type="submit" variant="outline-primary" className="w-100">
                    {t('signup.submit')}
                  </Button>
                </fieldset>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
