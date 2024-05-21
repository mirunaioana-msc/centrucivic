import React from 'react';
import stars from '../../../../assets/icons/stars.svg';
import { MENU_ROUTES_HREF } from '../../../../common/constants/Menu.constants';

interface DomainProps {
  name: string;
  id: number;
}

const Domain = ({ name, id }: DomainProps) => {
  return (
    <a
      aria-label={name}
      href={
        id === -1 ? `/${MENU_ROUTES_HREF.services}` : `/${MENU_ROUTES_HREF.services}?domains=${id}`
      }
      className="text-black"
    >
      <div className="flex gap-1">
        <img width={24} height={24} alt="domain image" src={stars}></img>
        <p className="font-titilliumBold md:text-xl lg:text-2xl text-md text-left hover:text-yellow">
          {name}
        </p>
      </div>
    </a>
  );
};

export default Domain;
