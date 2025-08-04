import { useQuery } from 'react-query';
import api from '../api/axios';
import { usePermissionStore } from '../store/permissionStore';

export const useFetchPermissions = () => {
  const setPermissions = usePermissionStore((state) => state.setPermissions);

  return useQuery('permissions', async () => {
    const { data } = await api.get('/permissions/my');
    // setPermissions(data);
    return data;
  });
};