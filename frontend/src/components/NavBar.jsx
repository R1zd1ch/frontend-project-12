import { Navbar, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const NavBar = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <Navbar bg="white" expand="sm" className="border-bottom shadow-sm" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Hexlet Chat
        </Navbar.Brand>
        {auth.loggedIn && (
          <Button
            onClick={() => {
              auth.logOut();
              navigate('/login');
            }}
          >
            Выйти
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
