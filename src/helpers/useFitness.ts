export const useCalculateFitness = (genes: number[]) => {
  let fitness = 0;
  for (let i = 0; i < genes.length; i++) {
    if (genes[i] === 1) {
      fitness++;
    }
  }
  return fitness;
};
