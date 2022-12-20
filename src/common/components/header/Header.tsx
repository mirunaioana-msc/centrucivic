import React, { useEffect, useState } from 'react';
import './Header.css';
import logo from './../../../assets/images/logo.svg';
import commitGlobalLogo from './../../../assets/images/commit-global-logo-black.svg';
import { MenuIcon } from '@heroicons/react/outline';
import { MENU_ROUTES, MENU_ROUTES_HREF } from '../../constants/Menu.constants';
import { useTranslation } from 'react-i18next';
import { COMMIT_GLOBAL_URL, DONATE_URL } from '../../constants/ExternalURL.constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { classNames } from '../../helpers/Tailwind.helper';
import { windowOpener } from '../../helpers/Navigation.helper';

interface HeaderProps {
  openSlidingMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ openSlidingMenu }: HeaderProps) => {
  const { t } = useTranslation('header');
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<string>();

  useEffect(() => {
    if (location.pathname === '/') {
      setActiveTab('/');
    } else {
      const found = Object.values(MENU_ROUTES_HREF).find((route) =>
        location.pathname.startsWith(`/${route}`),
      );
      setActiveTab(`/${found}`);
    }
  }, [location.pathname]);

  return (
    <header className="bg-white">
      <nav aria-label="Top">
        <div className="flex items-center sm:gap-4 gap-2 w-full xl:px-32 lg:px-18 sm:px-8 sm:py-2 px-2 bg-gray-50 h-12">
          <img src={commitGlobalLogo} alt="Commit Global" className="sm:h-full h-6" />
          <span className="sm:text-base text-xs">{t('commit_global_solution')}</span>
          <a
            className="text-blue font-bold hover:underline sm:text-base text-xs"
            href={COMMIT_GLOBAL_URL}
            target="_blank"
            rel="noreferrer"
          >
            {t('learn_more')}
          </a>
        </div>
        <div className="w-full xl:px-32 lg:px-18 sm:px-8 px-2 py-4 flex gap-4 justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img src={logo} alt="Code 4 Romania - ONG Hub" className="sm:h-full sm:w-full h-10" />
          </div>
          <div className="flex gap-4 items-center">
            <div className="gap-6 hidden lg:flex">
              {MENU_ROUTES.map((route) => (
                <a
                  className={classNames(
                    'menu-title',
                    activeTab === route.href ? 'text-yellow-700' : 'text-black',
                  )}
                  key={route.id}
                  onClick={() => navigate(route.href)}
                >
                  {route.name}
                </a>
              ))}
            </div>
            <div className="lg:pl-8 block">
              <button
                className="yellow-button lg:flex hidden w-12 menu-title"
                onClick={() => windowOpener(DONATE_URL)}
              >
                {t('donate')}
              </button>
            </div>
            <div className="flex lg:hidden items-center">
              <button
                className="flex items-center gap-4 hover:bg-green-tab py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                onClick={() => openSlidingMenu(true)}
              >
                <MenuIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
