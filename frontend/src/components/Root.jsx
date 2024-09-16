import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './NavBar';

const Root = () => (
  <div className="d-flex flex-column h-100">
    <NavBar />
    <Outlet />
    <ToastContainer position="bottom-left" theme="colored" />
  </div>
);

export default Root;
