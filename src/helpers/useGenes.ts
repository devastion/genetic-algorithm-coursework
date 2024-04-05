export const useGenes = () => {
  const genes = [];
  for (let i = 0; i < 10; i++) {
    genes.push(Math.floor(Math.random() * 100) % 2);
  }
  return genes;
};
