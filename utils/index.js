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

export const combinePostsAndComments = (posts, comments) => {
  const commentsByPostId = {};

  comments.forEach((comment) => {
    const postId = comment.relatedId;

    if (!commentsByPostId[postId]) {
      commentsByPostId[postId] = [];
    }
    commentsByPostId[postId].push(comment);
  });

  posts.forEach((post) => {
    const postId = post._id;
    if (commentsByPostId[postId]) {
      post.comments = commentsByPostId[postId].reverse();
    } else {
      post.comments = [];
    }
  });

  return posts;
};
