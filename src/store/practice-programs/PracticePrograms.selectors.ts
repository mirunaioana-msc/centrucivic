import useStore from '../Store';

export const usePracticePrograms = () => {
  const practicePrograms = useStore((state) => state.practicePrograms);
  const landingCounters = useStore((state) => state.landingCounters);
  return { practicePrograms, landingCounters };
};
