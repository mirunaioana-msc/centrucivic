import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MENU_ROUTES_HREF } from '../../../constants/Menu.constants';
import { classNames } from '../../../helpers/Tailwind.helper';

interface LandingCtaItemProps {
  backgroundColor: string;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  buttonClasses: string;
  anchorLinkText?: string;
}

const LandingCtaItem = (props: LandingCtaItemProps) => {
  const navigate = useNavigate();

  return (
    <div className={classNames(`${props.backgroundColor}`, 'pt-10 md:pt-16 md:pb-12 pb-8')}>
      <div className="flex flex-col gap-8 h-full justify-between xl:px-40 lg:px-24 sm:px-8 px-4">
        <p className="title pb-0">{props.title}</p>
        <p className="text-base w-10/12">
          {props.description}
          {props.anchorLinkText && (
            <a
              href={process.env.REACT_APP_P4G_LINK}
              className="cursor-pointer text-black underline"
            >
              {props.anchorLinkText}
            </a>
          )}
        </p>
        <button type="button" className={props.buttonClasses} onClick={props.onClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default LandingCtaItem;
