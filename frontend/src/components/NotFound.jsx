import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../routes';
import notFoundImg from '../assets/404.svg';

// prettier-ignore
const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img src={notFoundImg} alt={t('notFound.header')} className="img-fluid h-25" />
      <h1 className="h4 text-muted">{t('notFound.header')}</h1>
      <p className="text-muted">
        {t('notFound.message')}
        <Link to={routes.chatPage()}>{t('notFound.linkText')}</Link>
      </p>
    </div>
  );
};

export default NotFound;
