import { IconTypes } from '../enums/IconTypes.enum';

export const LANDING_DOMAINS = [
  { name: 'Medical', icon: IconTypes.USERS },
  { name: 'Jurnalism', icon: IconTypes.USERS },
  { name: 'Educație', icon: IconTypes.USERS },
  { name: 'Inginerie', icon: IconTypes.USERS },
  { name: 'Tech', icon: IconTypes.USERS },
  { name: 'Advocacy', icon: IconTypes.USERS },
];

export const PRACTICE_PROGRAMS = {
  meta: {
    itemCount: 5,
    totalItems: 5,
    itemsPerPage: 5,
    totalPages: 1,
    currentPage: 1,
  },
  items: [
    {
      id: 1,
      organization: { id: 1, organizationGeneral: { name: 'Organizatia ONG' } },
      title: 'Titlu scurt de program de practica',
      deadline: new Date('2022-11-01T20:00:00.000Z'),
      location: {
        id: 1,
        name: '1 Decembrie',
      },
      startDate: new Date('2022-12-31T20:00:00.000Z'),
      endDate: null,
      minWorkingHours: 60,
      maxWorkingHours: 70,
      link: 'www.test.com',
      description: 'Asta este o descriere a unui program de preactica',
      skills: [],
      domains: [],
      faculties: [],
    },
    {
      id: 2,
      organization: { id: 1, organizationGeneral: { name: 'Organizatia ONG' } },
      title: 'Titlu scurt de program de practica',
      deadline: null,
      location: {
        id: 1,
        name: '1 Decembrie',
      },
      startDate: new Date('2022-11-20T20:00:00.000Z'),
      endDate: new Date('2022-12-31T20:00:00.000Z'),
      minWorkingHours: 60,
      maxWorkingHours: 70,
      link: 'www.test.com',
      description: 'Asta este o descriere a unui program de preactica',
      skills: [],
      domains: [],
      faculties: [],
    },
    {
      id: 3,
      organization: { id: 1, organizationGeneral: { name: 'Organizatia ONG' } },
      title: 'Titlu scurt de program de practica',
      deadline: new Date('2022-11-01T20:00:00.000Z'),
      location: {
        id: 1,
        name: '1 Decembrie',
      },
      startDate: new Date('2022-11-20T20:00:00.000Z'),
      endDate: new Date('2022-12-31T20:00:00.000Z'),
      minWorkingHours: 60,
      maxWorkingHours: 70,
      link: 'www.test.com',
      description: 'Asta este o descriere a unui program de preactica',
      skills: [],
      domains: [],
      faculties: [],
    },
    {
      id: 4,
      organization: { id: 1, organizationGeneral: { name: 'Organizatia ONG' } },
      title: 'Titlu scurt de program de practica',
      deadline: new Date('2022-11-01T20:00:00.000Z'),
      location: {
        id: 1,
        name: '1 Decembrie',
      },
      startDate: new Date('2022-11-20T20:00:00.000Z'),
      endDate: new Date('2022-12-31T20:00:00.000Z'),
      minWorkingHours: 60,
      maxWorkingHours: 70,
      link: 'www.test.com',
      description: 'Asta este o descriere a unui program de preactica',
      skills: [],
      domains: [],
      faculties: [],
    },
    {
      id: 5,
      organization: { id: 1, organizationGeneral: { name: 'Organizatia ONG' } },
      title: 'Titlu scurt de program de practica',
      deadline: new Date('2022-11-01T20:00:00.000Z'),
      location: {
        id: 1,
        name: '1 Decembrie',
      },
      startDate: new Date('2022-11-20T20:00:00.000Z'),
      endDate: new Date('2022-12-31T20:00:00.000Z'),
      minWorkingHours: 60,
      maxWorkingHours: 70,
      link: 'www.test.com',
      description: 'Asta este o descriere a unui program de preactica',
      skills: [],
      domains: [],
      faculties: [],
    },
  ],
};

export const ORGANIZATIONS = {
  meta: {
    itemCount: 6,
    totalItems: 6,
    itemsPerPage: 6,
    totalPages: 1,
    currentPage: 1,
  },
  items: [
    {
      id: 1,
      logo: '',
      name: 'Denumire Scurta ONG',
      shortDescription:
        'Short Description Short Description Short Description Short Description Short Description',
    },
    {
      id: 2,
      logo: '',
      name: 'Denumire Scurta ONG',
      shortDescription:
        'Short Description Short Description Short Description Short Description Short Description',
    },
    {
      id: 3,
      logo: '',
      name: 'Denumire Scurta ONG',
      shortDescription:
        'Short Description Short Description Short Description Short Description Short Description Short Description Short Description Short Description Short Description Short Description Short Description Short Description Short Description Short Description Short Description Short Description Short Description Short Description Short Description',
    },
    {
      id: 4,
      logo: '',
      name: 'Denumire Scurta ONG',
      shortDescription:
        'Short Description Short Description Short Description Short Description Short Description Short Description Short Description Short Description Short Description Short Description Short Description Short Description Short Description Short Description',
    },
    {
      id: 5,
      logo: '',
      name: 'Denumire Scurta ONG',
      shortDescription:
        'Short Description Short Description Short Description Short Description Short Description',
    },
    {
      id: 6,
      logo: '',
      name: 'Denumire Scurta ONG',
      shortDescription:
        'Short Description Short Description Short Description Short Description Short Description',
    },
  ],
};
