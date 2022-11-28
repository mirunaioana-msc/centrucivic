import React from 'react';
import { useTranslation } from 'react-i18next';
import commitGlobalLogo from './../../../assets/images/commit-global-logo-white.svg';

const Footer = () => {
  const { t } = useTranslation('footer');
  return (
    <div className="flex flex-col md:flex-row gap-6 bg-black text-white w-full px-4 py-6 lg:py-24 lg:px-40 md:px-8 md:justify-between">
      <div className='flex lg:gap-20 md:gap-8 flex-col md:flex-row'>
        <div className='flex flex-col'>
          <span className='footer-title pb-4'>{t('urls')}</span>
          <span className='footer-url'>{t('donate')}</span>
          <span className='footer-url'>{t('about')}</span>
          <span className='footer-url'>{t('source_code')}</span>
        </div>
        <div className='flex flex-col'>
          <span className='footer-title pb-4'>{t('info')}</span>
          <span className='footer-url'>{t('privacy_policy')}</span>
          <span className='footer-url'>{t('terms')}</span>
        </div>
      </div>
      <div className='flex flex-col md:items-end'>
        <img src={commitGlobalLogo} alt="Commit Global" className="w-32 pb-4" />
        <span className='footer-text'>&#169; {new Date().getFullYear()} {t('copyright_commit')}</span>
        <span className='footer-text'>{t('about_ngo')}</span>
      </div>
    </div>
  );
};

export default Footer;
