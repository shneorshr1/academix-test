import { useQuery } from 'react-query';
import api from '../api/axios';
import { usePermissionStore } from '../store/permissionStore';

export const useRoleAssignments = () => {
    const setPermissions = usePermissionStore((state) => state.setPermissions);
  
    return useQuery({
      queryKey: ["roleAssignments"],
      queryFn: async () => {
        const { data } = await api.get("/roleAssignments");
        return data;
      },
      onSuccess: (data) => {
        setPermissions(data);
      },
    });
  };
  
