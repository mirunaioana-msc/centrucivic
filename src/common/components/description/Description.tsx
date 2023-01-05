import React from 'react';
import { openInNewTab } from '../../helpers/Format.helper';

interface DescriptionProps {
  title: string;
  content: string;
  image: string;
  isTextRight?: boolean;
  layoutCSS?: string;
  cta?: {
    label?: string;
    link?: string;
  };
}

const Description = ({ title, content, image, cta, isTextRight, layoutCSS }: DescriptionProps) => {
  return (
    <div className="w-full">
      <div
        className={`${
          layoutCSS ? layoutCSS : ''
        } grid md:grid-cols-2 grid-cols-1 gap-x-12 lg:gap-y-10 gap-y-5`}
      >
        <div
          className={`flex flex-col sm:gap-10 gap-5 ${
            isTextRight ? 'order-2' : 'md:order-1 order-2'
          }`}
        >
          <p className="title text-center md:text-left">{title}</p>
          <p className="body-text w-full">{content}</p>
          {cta && (
            <button
              onClick={() => {
                if (cta?.link) openInNewTab(cta.link);
              }}
              className="yellow-button md:ml-0 mx-auto"
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
    </div>
  );
};

export default Description;
