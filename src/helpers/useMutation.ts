export const useMutation = (genesArr: number[][]) => {
  for (const genes of genesArr) {
    const prob = Math.floor(Math.random() * 100 + 1);
    if (prob <= 10) {
      const idx = Math.floor(Math.random() * genes.length);
      genes[idx] = Math.abs(genes[idx] - 1);
    }
  }
};
