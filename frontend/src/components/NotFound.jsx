import { Link } from 'react-router-dom';
import NotFoundImg from '../assets/404.svg';

const NotFound = () => (
  <div className="text-center">
    <img src={NotFoundImg} alt="Страница не найдена" className="img-fluid h-25" />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти
      <span> </span>
      <Link to="/">Главную страницу</Link>
    </p>
  </div>
);

export default NotFound;
