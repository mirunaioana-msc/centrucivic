import useStore from "../Store";

export const usePracticePrograms = () => {
  const practicePrograms = useStore((state) => state.practicePrograms);
  return { practicePrograms };
};
