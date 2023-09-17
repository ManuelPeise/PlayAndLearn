export const getRandomIndex = (arrayLength: number): number => {
  const randomIndex: number = Math.floor(Math.random() * arrayLength);

  return randomIndex;
};
