import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingCta = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-screen-xl mx-auto px-10">
      <div className="sm:py-20 py-10 grid md:grid-cols-2 grid-cols-1 lg:gap-y-10 gap-y-5">
        <div className="bg-yellow-500">
          <div className="flex flex-col mx-10 my-8">
            <p className="title">Vrei sa adaugi serviciile organizatiei tale?</p>
            <p className="text-base">
              Pentru a putea prezenta serviciile organizației tale este necesar să ai un cont în ONG
              Hub, punctul unic de acces la toate serviciile digitale asigurate pro-bono pentru
              societatea civilă in România.{' '}
            </p>
            <button
              type="button"
              className="yellow-button bg-black text-white my-8"
              onClick={() =>
                window.open(
                  process.env.REACT_APP_CREATE_ONG_PROFILE_LINK,
                  '_blank',
                  'noopener,noreferrer',
                )
              }
            >
              Inscrie-te in ONG Hub
            </button>
          </div>
        </div>
        <div className="bg-gray-100">
          <div className="flex flex-col mx-10 my-8">
            <p className="title">Vrei sa te implici ca voluntar?</p>
            <p className="text-base">
              Poți contacta ONG-urile din Centru Civic pentru a descoperi cum poți deveni voluntar.
              Dacă ești student, vezi programele de practică disponibile în sectorul non-profit pe
              <a href={process.env.REACT_APP_P4G_LINK} target="_blank" rel="noreferrer noopener">
                {' '}
                Practice for Good
              </a>
              .
            </p>
            <button
              type="button"
              className="yellow-button my-8"
              onClick={() => navigate('/organizations')}
            >
              Descopera ONG-urile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingCta;
