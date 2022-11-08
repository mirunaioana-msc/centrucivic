import React from 'react';

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
  return (
    <div className={props.backgroundColor}>
      <div className="flex flex-col mx-10 my-8 pl-10 xl:pl-24">
        <p className="title h-28">{props.title}</p>
        <p className="text-base w-1/2">
          {props.description}
          {props.anchorLinkText && (
            <a href={process.env.REACT_APP_P4G_LINK} target="_blank" rel="noreferrer noopener">
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
