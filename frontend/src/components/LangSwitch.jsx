import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LangSwitch = () => {
  const { t, i18n } = useTranslation();

  const handleLangSwitch = (e) => {
    const { lang } = e.target.dataset;
    i18n.changeLanguage(lang);
  };

  const getClassName = (currLang) => (i18n.language === currLang ? 'fw-bold' : '');

  return (
    <Dropdown>
      <Dropdown.Toggle variant="">{t(`languages.${i18n.language}`)}</Dropdown.Toggle>
      <Dropdown.Menu className="min-w-auto">
        <Dropdown.Item
          as="button"
          data-lang="ru"
          onClick={handleLangSwitch}
          className={getClassName('ru')}
        >
          {t('languages.ru')}
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          data-lang="en"
          onClick={handleLangSwitch}
          className={getClassName('en')}
        >
          {t('languages.en')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LangSwitch;
