export const useGenes = (len: number) => {
  const genes = [];
  for (let i = 0; i < len; i++) {
    genes.push(Math.floor(Math.random() * 100) % 2);
  }
  return genes;
};
