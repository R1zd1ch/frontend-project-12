import { Link } from 'react-router-dom';
import notFoundImg from '../assets/404.svg';

// prettier-ignore
const NotFound = () => (
  <div className="text-center">
    <img src={notFoundImg} alt="Страница не найдена" className="img-fluid h-25" />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти
      {' '}
      <Link to="/">главную страницу.</Link>
    </p>
  </div>
);

export default NotFound;
