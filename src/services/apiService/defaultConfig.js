import { LOGIN } from './apiEndPoints';

// ** Auth Endpoints
const defaultConfig = {
  tokenType: 'Bearer',
  storageTokenKeyName: 'token',
  storageRefreshTokenKeyName: 'refreshToken',
  loginEndpoint: LOGIN,
};
export default defaultConfig;
