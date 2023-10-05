export const getRandomIndex = (arrayLength: number): number => {
  const randomIndex: number = Math.floor(Math.random() * arrayLength);

  return randomIndex;
};

export const getFileSrcFromBase64 = (src: string) => {
  return `data:image/jpeg;base64,${src}`;
};
