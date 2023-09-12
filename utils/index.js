const customRandomAlphabet = (alphabet, N) => {
  if (N <= 0) {
    throw new Error("N must be greater than 0");
  }

  const alphabetLength = alphabet.length;
  let customAlphabetString = "";

  for (let i = 0; i < N; i++) {
    const randomIndex = Math.floor(Math.random() * alphabetLength);
    customAlphabetString += alphabet[randomIndex];
  }

  return customAlphabetString;
};

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const N = process.env.RANDOM_N || 6;

export const generateShortURL = () => {
  return customRandomAlphabet(alphabet, N);
};
