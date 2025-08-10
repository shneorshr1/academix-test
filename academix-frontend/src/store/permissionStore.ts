import { create } from 'zustand';

type Permission = {
  id: number;
  role_code: string;
  scope_type: string;
  scope_id: number | null;
  scope_name?: string;
  course:any
};


type PermissionState = {
  permissions: Permission[];
  selectedPermission: Permission | null;
  setPermissions: (permissions: Permission[]) => void;
  setSelectedPermission: (permission: Permission) => void;

};

export const usePermissionStore = create<PermissionState>((set) => ({
  permissions: [],
  setPermissions: (permissions) => set({ permissions }),
  selectedPermission: null, 
  setSelectedPermission: (permission) => set({ selectedPermission: permission })

}));
