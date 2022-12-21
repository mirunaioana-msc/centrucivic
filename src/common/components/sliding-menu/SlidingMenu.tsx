import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { classNames } from '../../helpers/Tailwind.helper';
import logo from './../../../assets/images/logo.svg';
import { MENU_ROUTES, MENU_ROUTES_HREF } from '../../constants/Menu.constants';
import { XIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';
import { windowOpener } from '../../helpers/Navigation.helper';
import { CODE_4_URL, DONATE_URL } from '../../constants/ExternalURL.constants';
import { IMenuURL } from '../../interfaces/Menu.interface';

interface SlidingMenuProps {
  isOpen: boolean;
  setSlidingMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SlidingMenu({ isOpen, setSlidingMenuOpen }: SlidingMenuProps) {
  const { t } = useTranslation('sliding_menu');
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<string>();

  const handleMenuItemClick = (item: IMenuURL) => {
    setSlidingMenuOpen(false);
    navigate(`${item.href}`);
  };

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
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setSlidingMenuOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none relative h-full inset-y-0 left-0 flex w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-[-100vw]"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-[-100vw]"
              >
                <Dialog.Panel className="pointer-events-auto h-full  overflow-y-scroll w-full bg-white p-6 pt-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className=" flex justify-between py-8 border-b-2">
                      <div className="flex items-center">
                        <img
                          src={logo}
                          alt="Code 4 Romania - ONG Hub"
                          className="sm:h-full sm:w-full h-10"
                        />
                      </div>
                      <button
                        type="button"
                        className="rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setSlidingMenuOpen(false)}
                      >
                        <XIcon className="w-6 h-6" />
                        <span className="sr-only">Close panel</span>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex w-full relative">
                    <div className="gap-6 flex flex-col w-full h-full justify-between">
                      <nav
                        className={classNames(
                          'w-full',
                          'transition-width duration-300 ease-out pt-10 gap-12 font-titilliumBold  select-none flex flex-col',
                        )}
                        aria-label="Sidebar"
                      >
                        {MENU_ROUTES.map((item) => (
                          <a
                            key={item.name}
                            className={classNames(
                              'side-menu-title active:text-yellow-600',
                              activeTab === item.href && 'text-yellow-700',
                            )}
                            onClick={() => handleMenuItemClick(item)}
                          >
                            {item.name}
                          </a>
                        ))}
                      </nav>
                      <div className="flex flex-col gap-2 items-center w-full pt-64">
                        <button
                          className="yellow-button flex w-full justify-center py-2 text-lg"
                          onClick={() => windowOpener(DONATE_URL)}
                        >
                          {t('donate')}
                        </button>
                        <span>{t('how')}</span>
                        <a
                          className="text-blue font-bold hover:underline text-base"
                          href={CODE_4_URL}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {t('learn_more')}
                        </a>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
