import { TOKEN_KEY } from './storageConfig';

const storageGetToken = () => localStorage.getItem(TOKEN_KEY);

const storageRemoveToken = async () => localStorage.removeItem(TOKEN_KEY);

const storageSetToken = async (token: string) =>
  localStorage.setItem(TOKEN_KEY, token);

export { storageGetToken, storageRemoveToken, storageSetToken };
