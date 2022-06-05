import { useTranslation } from 'react-i18next';

import './AppLanguageSwitcher.scss';

function AppLanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="AppLanguageSwitcher">
      <button
        className={i18n.language === 'en' && 'active'}
        onClick={() => changeLanguage('en')}
      >
        en
      </button>
      <button
        className={i18n.language === 'pl' && 'active'}
        onClick={() => changeLanguage('pl')}
      >
        pl
      </button>
    </div>
  );
}

export default AppLanguageSwitcher;
