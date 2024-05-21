import React from 'react';
import { useTranslation } from 'react-i18next';
import commitGlobalLogo from './../../../assets/images/commit-global-logo-white.svg';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation('footer');
  const navigate = useNavigate();
  return (
    <div className="w-full bg-black text-white">
      <div className="wrapper flex flex-col md:flex-row gap-6 md:justify-between">
        <div className="flex lg:gap-20 md:gap-8 flex-col md:flex-row">
          <div className="flex flex-col">
            <span className="footer-title pb-4">{t('urls')}</span>
            <a className="text-black font-bold hover:underline sm:text-base text-xxs"
              href={'https://www.code4.ro/ro/doneaza'}
              target="_blank"
              rel="noreferrer">
              <span className="footer-url">{t('donate')}</span>
            </a>
            <span className="footer-url" onClick={() => navigate('/about')}>{t('about')}</span>
            <a className="text-black font-bold hover:underline sm:text-base text-xxs"
              href={'https://github.com/code4romania/centrucivic'}
              target="_blank"
              rel="noreferrer">
              <span className="footer-url">{t('source_code')}</span>
            </a>
          </div>
          <div className="flex flex-col">
            <span className="footer-title pb-4">{t('info')}</span>
            <span className="footer-url" onClick={() => navigate('/policy')}>{t('privacy_policy')}</span>
            <span className="footer-url" onClick={() => navigate('/terms')}>{t('terms')}</span>
          </div>
        </div>
        <div className="flex flex-col md:items-end">
          <img
            width={'128px'}
            height={'53px'}
            src={commitGlobalLogo}
            alt="Commit Global"
            className="w-32 pb-4"
          />
          <span className="footer-text">
            &#169; {new Date().getFullYear()} {t('copyright_commit')}
          </span>
          <span className="footer-text text-left md:text-right">{t('about_ngo')}</span>
        </div>
      </div>
    </div >
  );
};

export default Footer;
