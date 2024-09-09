import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <Navbar bg="white" expand="sm" className="border-bottom shadow-sm" variant="light">
    <Container>
      <Navbar.Brand as={Link} to="/">
        Hexlet Chat
      </Navbar.Brand>
    </Container>
  </Navbar>
);

export default NavBar;
