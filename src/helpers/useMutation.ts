export const useMutation = (genes: number[]) => {
  const genesCopy = [...genes];
  const prob = Math.floor(Math.random() * 100 + 1);
  if (prob <= 10) {
    const idx = Math.floor(Math.random() * genesCopy.length);
    genesCopy[idx] = Math.abs(genesCopy[idx] - 1);
  }

  return genesCopy;
};
