import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Root = () => (
  <div className="d-flex flex-column h-100">
    <NavBar />
    <Outlet />
  </div>
);

export default Root;
