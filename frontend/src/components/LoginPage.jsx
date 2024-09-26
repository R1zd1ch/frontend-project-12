import {
  Button,
  Form,
  Col,
  Card,
  Row,
  Container,
  Image,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import routes from '../routes';
import useAuth from '../hooks/useAuth';
import loginImg from '../assets/login.jpg';

const LoginPage = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();

  const auth = useAuth();
  const navigate = useNavigate();

  const [authFailed, setAuthFailed] = useState(false);

  const validationSchema = yup.object().shape({
    username: yup.string().trim().required(t('login.required')),
    password: yup.string().trim().required(t('login.required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginApi(), values);
        const userData = res.data;
        auth.logIn(userData);
        navigate(routes.chatPage());
      } catch (err) {
        setSubmitting(false);
        console.error(err);
        if (!err.isAxiosError) {
          rollbar.error('Unknown error while trying to login', err);
          toast.error(t('errors.unknown'));
          return;
        }

        if (err.response?.status === 401) {
          setAuthFailed(true);
          return;
        }

        rollbar.error('Network error while trying to login', err);
        toast.error(t('errors.network'));
      }
    },
  });

  const usernameInput = useRef(null);
  useEffect(() => {
    usernameInput.current.focus();
  }, [formik.isSubmitting]);

  const isUsernameInvalid = formik.errors.username && formik.touched.username;
  const isPasswordInvalid = formik.errors.password && formik.touched.password;

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-5 row">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image src={loginImg} alt={t('login.header')} roundedCircle />
              </Col>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('login.header')}</h1>
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
                      placeholder={t('login.username')}
                      autoComplete="username"
                      required
                      ref={usernameInput}
                      isInvalid={authFailed || isUsernameInvalid}
                    />
                    <Form.Label>{t('login.username')}</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip={isUsernameInvalid}>
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4 form-floating" controlId="password">
                    <Form.Control
                      type="password"
                      onChange={(e) => {
                        setAuthFailed(false);
                        formik.handleChange(e);
                      }}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      placeholder={t('login.password')}
                      autoComplete="password"
                      isInvalid={authFailed || isPasswordInvalid}
                      required
                    />
                    <Form.Label>{t('login.password')}</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.password || t('login.authFailed')}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" variant="outline-primary" className="w-100 mb-3">
                    {t('login.submit')}
                  </Button>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('login.newToChat')}</span>
                <Link to={routes.signupPage()}>{t('login.signup')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
