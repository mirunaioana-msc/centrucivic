import React from 'react';
import { openInNewTab } from '../../helpers/Format.helper';

interface DescriptionProps {
  title: string;
  content: string;
  image: string;
  isTextRight?: boolean;
  cta?: {
    label?: string;
    link?: string;
  };
}

const Description = ({ title, content, image, cta, isTextRight }: DescriptionProps) => {
  return (
    <div className="sm:py-20 py-10 grid md:grid-cols-2 grid-cols-1 lg:gap-x-32 gap-x-12 lg:gap-y-10 gap-y-5">
      <div className={`flex flex-col ${isTextRight ? 'order-2' : 'md:order-1 order-2'}`}>
        <p className="title sm:mb-10 mb-5 text-center md:text-left">{title}</p>
        <p className="body-text w-full">{content}</p>
        {cta && (
          <button
            onClick={() => {
              if (cta?.link) openInNewTab(cta.link);
            }}
            className="yellow-button sm:mt-10 mt-5 md:ml-0 mx-auto"
          >
            {cta?.label}
          </button>
        )}
      </div>
      <img
        src={image}
        alt="ONGHub - logo"
        className={`mx-auto md:h-[30rem] h-20 ${isTextRight ? 'order-1' : 'md:order-2 order-1'}`}
      />
    </div>
  );
};

export default Description;
