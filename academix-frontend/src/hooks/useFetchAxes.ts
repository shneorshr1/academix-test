// hooks/useFetchAxes.ts
import { useQuery } from 'react-query';
import api from '../api/axios';
import { usePermissionStore } from '../store/permissionStore';

export const useFetchAxes = () => {
  const selectedPermission = usePermissionStore((state) => state.selectedPermission);

  console.log(selectedPermission);
  
  return useQuery(
    ['axes', selectedPermission],
    async () => {
      const { data } = await api.get('/axes/by-permission', {
        params: {
          scopeType: selectedPermission?.scope_type,
          scopeId: selectedPermission?.scope_id
        }
      });

      console.log(data);
      
      return data;
    },
    {
      enabled: !!selectedPermission, // לא לרוץ עד שיש הרשאה נבחרת
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, 
      onError: (error) => {
        console.error(error);
        return { error: "Failed to fetch axis" };
      }
    
    }
  );
};
