import React from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../../../../assets/icons/users.svg';
import { MENU_ROUTES_HREF } from '../../../../common/constants/Menu.constants';

interface DomainProps {
  name: string;
  id: number;
}

const Domain = ({ name, id }: DomainProps) => {
  const navigate = useNavigate();

  return (
    <a
      onClick={() => navigate(`${MENU_ROUTES_HREF.services}?domains=${id}`)}
      className="text-black"
    >
      <div className="bg-gray-100 hover:bg-yellow mx-auto max-w-2xl xs:aspect-square aspect-auto flex justify-center items-center flex-col gap-y-4 p-3 xs:h-auto h-full cursor-pointer">
        <img
          alt="domain image"
          className="xl:max-w-[8rem] md:max-w-[3rem] xs:max-w-[2.8rem] max-w-[1.5rem]"
          src={users}
        ></img>

        <p className="font-titilliumBold sm:text-2xl lg:text-3xl xs:text-md text-sm text-center">
          {name}
        </p>
      </div>
    </a>
  );
};

export default Domain;
