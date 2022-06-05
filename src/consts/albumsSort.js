import { useTranslation } from 'react-i18next';

export const OPTIONS = () => {
  const { t } = useTranslation();

  return [
    {
      label: t('sorting.from-the-newest'),
      value: 'asc',
    },
    {
      label: t('sorting.from-the-oldest'),
      value: 'dsc',
    },
    {
      label: t('sorting.from-a-to-z'),
      value: 'az',
    },
    {
      label: t('sorting.from-z-to-a'),
      value: 'za',
    },
    {
      label: t('sorting.by-id'),
      value: 'id',
    },
  ];
};
