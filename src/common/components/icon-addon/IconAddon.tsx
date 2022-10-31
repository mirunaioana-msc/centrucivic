import React from 'react';
import { classNames } from '../../helpers/Tailwind.helper';

const IconAddon = (props: { icon: any, iconColor?: string }) => {
  return (
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <props.icon className={classNames(`w-5 h-5 text-gray-500`, `${props.iconColor && props.iconColor}`)} />
    </div>
  );
};

export default IconAddon;
