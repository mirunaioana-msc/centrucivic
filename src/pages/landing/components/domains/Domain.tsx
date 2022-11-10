import React from 'react';
import users from '../../../../assets/icons/users.svg';
import { IconTypes } from '../../../../common/enums/IconTypes.enum';
import { IDomain } from './Domains';

const Domain = ({ name, icon }: IDomain) => {
  return (
    <div className="bg-gray-150 hover:bg-yellow xs:aspect-square aspect-auto flex justify-center items-center flex-col gap-y-4 p-3 xs:h-auto h-full 2xl:w-7/12">
      {icon === IconTypes.USERS ? (
        <img
          alt="domain image"
          className="xl:max-w-[8rem] md:max-w-[3rem] xs:max-w-[2.8rem] max-w-[1.5rem]"
          src={users}
        ></img>
      ) : (
        ''
      )}
      <p className="font-titilliumBold sm:text-2xl lg:text-3xl xs:text-md text-sm text-center">
        {name}
      </p>
    </div>
  );
};

export default Domain;
