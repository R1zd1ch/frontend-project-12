// prettier-ignore
import {
  Button, Form, Col, Card, Row, Container, Image,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';
import signupImg from '../assets/signup.jpg';

const SignupPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();

  const [authFailed, setAuthFailed] = useState(false);

  const usernameInput = useRef(null);
  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required(t('signup.required'))
      .min(3, t('signup.usernameConstraints'))
      .max(20, t('signup.usernameConstraints')),
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
        await auth.signUp({ username, password });
        navigate('/');
      } catch (err) {
        setSubmitting(false);
        if (err.isAxiosError && err.response.status === 409) {
          setAuthFailed(true);
          usernameInput.current.select();
          return;
        }
        throw err;
      }
    },
  });

  const isUsernameInvalid = formik.errors.username && formik.touched.username;
  const isPasswordInvalid = formik.errors.password && formik.touched.password;
  const isConfirmPasswordInvalid = formik.errors.confirmPassword && formik.touched.confirmPassword;

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <Image src={signupImg} alt={t('signup.header')} roundedCircle />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
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
