import { client } from '../utils/httpClient';
import { UserType } from '../common/types/UserType';

type ResponseType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: UserType[];
};

export const getUsers = () => {
  return client.get<ResponseType>('/api/table/?limit=50');
};

export const getUserById = (id: number) => {
  return client.get<UserType>(`/api/table/${id}/`);
};

export const addUser = (data: Omit<UserType, 'id'>) => {
  return client.post<UserType>('/api/table/', data);
};

export const updateUser = ({ id, ...data }: UserType) => {
  return client.put<UserType>(`/api/table/${id}`, data);
};

export const partialUpdateUser = ({
  id,
  ...data
}: Partial<UserType> & Pick<UserType, 'id'>) => {
  return client.patch<UserType>(`/api/table/${id}`, data);
};

export const deleteUser = (id: number) => {
  return client.delete<JSON>(`/api/table/${id}/`);
};
