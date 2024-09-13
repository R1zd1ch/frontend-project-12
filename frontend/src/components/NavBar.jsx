import { Navbar, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';
import LangSwitch from './LangSwitch';

const NavBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <Navbar bg="white" expand="sm" className="border-bottom shadow-sm" variant="light">
      <Container>
        <div className="d-flex flex-row">
          <Navbar.Brand as={Link} to="/">
            {t('hexletChat')}
          </Navbar.Brand>
          <LangSwitch />
        </div>
        {auth.loggedIn && (
          <Button
            onClick={() => {
              auth.logOut();
              navigate('/login');
            }}
          >
            {t('logout')}
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
