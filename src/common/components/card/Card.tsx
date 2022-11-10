import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return <div className="w-full bg-white shadow-card rounded-xl p-8">{children}</div>;
};

export default Card;
