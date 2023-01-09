import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LandingCtaItemProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  buttonClasses: string;
  anchorLinkText?: string;
}

const LandingCtaItem = (props: LandingCtaItemProps) => {
  return (
    <div className="flex flex-col gap-8 justify-between">
      <p className="title">{props.title}</p>
      <p className="text-base">
        {props.description}
        {props.anchorLinkText && (
          <a
            aria-label={props.anchorLinkText}
            href={process.env.REACT_APP_P4G_LINK}
            className="cursor-pointer text-black underline"
          >
            {props.anchorLinkText}
          </a>
        )}
      </p>
      <button
        aria-label={props.buttonText}
        type="button"
        className={props.buttonClasses}
        onClick={props.onClick}
      >
        {props.buttonText}
      </button>
    </div>
  );
};

export default LandingCtaItem;
