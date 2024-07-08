import APIService from './apiService';

export default function useApi(apiOverrideConfig) {
  const api = new APIService(apiOverrideConfig);
  return {
    api,
  };
}
