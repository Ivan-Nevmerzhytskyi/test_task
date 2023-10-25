import { client } from '../utils/httpClient';

type LoginAuthType = { username: string; password: string };

export const login = ({ username, password }: LoginAuthType) => {
  return client.post<JSON>('/api/login/', { username, password });
};
