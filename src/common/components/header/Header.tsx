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
        <div className="w-full bg-gray-50 sm:h-12 h-10 flex items-center">
          <div className="wrapper flex-row items-center sm:gap-4 gap-2 sm:py-2 py-0 sm:w-[90%] lg:max-w-screen-3xl">
            <img src={commitGlobalLogo} alt="Commit Global" className="sm:h-full h-6" />
            <span className="sm:text-base text-xxs">{t('commit_global_solution')}</span>
            <a
              className="text-blue font-bold hover:underline sm:text-base text-xxs"
              href={COMMIT_GLOBAL_URL}
              target="_blank"
              rel="noreferrer"
            >
              {t('learn_more')}
            </a>
          </div>
        </div>
        <div className="w-full flex items-center sm:min-h-[5rem]">
          <div className="wrapper flex-row gap-4 py-2 sm:w-[90%] lg:max-w-screen-3xl">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <img src={logo} alt="Code 4 Romania - ONG Hub" className="sm:h-full sm:w-full h-10" />
            </div>
            <div className="flex gap-4 items-center ml-auto">
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
              <button
                className="yellow-button bg-black text-white lg:flex hidden menu-title hover:bg-black-800 w-[9rem] justify-center ml-10"
                onClick={() => windowOpener(DONATE_URL)}
              >
                {t('donate')}
              </button>
              <div className="flex lg:hidden items-center">
                <button
                  className="flex items-center gap-4 hover:bg-green-tab py-2 px-4 rounded-xl outline-none"
                  onClick={() => openSlidingMenu(true)}
                >
                  <MenuIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
