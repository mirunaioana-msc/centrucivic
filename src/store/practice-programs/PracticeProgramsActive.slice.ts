import { ILandingCounter } from '../../common/interfaces/LandingCounter.interface';

export const PracticeProgramsActiveSlice = (set: any) => ({
  landingCounters: {
    activePracticePrograms: 0,
    ongsWithApplication: 0,
  },
  setLandingCounters: (landingCounters: ILandingCounter) => {
    set(landingCounters);
  },
});
