import { useQuery } from 'react-query';
import axios from "axios";
import api from '../api/axios';

type ScopeType = "system" | "domain" | "course" | "team";

interface Permission {
  scope_type: ScopeType;
  scope_id: number | null;
}

export const useFetchAxes = (permission: Permission | null) => {
  return useQuery({
    queryKey: ["axes", permission],
    queryFn: async () => {
      if (!permission) return [];

      const { scope_type, scope_id } = permission;

  
      const { data } = await api.get("/axes/by-permission", {
        params: {
          scopeType: scope_type,
          scopeId: scope_id,
        },
      });

      return data;
    },
    enabled: !!permission,
  });
};
