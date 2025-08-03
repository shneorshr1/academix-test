import { create } from 'zustand';

type Permission = {
  id: number;
  role_code: string;
  scope_type: string;
  scope_id: number | null;
  scope_name?: string;
};

type PermissionState = {
  permissions: Permission[];
  setPermissions: (permissions: Permission[]) => void;
};

export const usePermissionStore = create<PermissionState>((set) => ({
  permissions: [],
  setPermissions: (permissions) => set({ permissions })
}));
