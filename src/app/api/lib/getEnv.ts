export function getEnv() {
  const publicKey = process.env.STORYBLOCKS_API_KEY;
  const privateKey = process.env.STORYBLOCKS_SECRET_KEY;

  if (!publicKey || !privateKey) {
    console.warn('Missing API credentials');
  }

  return { publicKey, privateKey };
}
