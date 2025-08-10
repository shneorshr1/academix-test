import { useQuery } from 'react-query';
import api from '../api/axios';
import { usePermissionStore } from '../store/permissionStore';

export const useFetchPermissions = () => {
  const setPermissions = usePermissionStore((state) => state.setPermissions);
  const setSelectedPermission = usePermissionStore((state) => state.setSelectedPermission);


  const userId = 3;


  return useQuery(
    ['permissions', userId],
    async () => {
      const { data } = await api.get(`/permissions/my/${userId}`);
      return data;
    },
    {
      enabled: !!userId,
      refetchOnWindowFocus: false, 
      staleTime: Infinity,            
      cacheTime: Infinity,             
      onSuccess: (data) => {
        setPermissions(data);
        setSelectedPermission(data[0]);
      },
    }
  );
};
