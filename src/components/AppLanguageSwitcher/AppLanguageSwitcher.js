import { useTranslation } from 'react-i18next';

import './AppLanguageSwitcher.scss';

function AppLanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="AppLanguageSwitcher">
      {i18n.language === 'en' && (
        <button onClick={() => changeLanguage('pl')}>pl</button>
      )}
      {i18n.language === 'pl' && (
        <button onClick={() => changeLanguage('en')}>en</button>
      )}
    </div>
  );
}

export default AppLanguageSwitcher;
