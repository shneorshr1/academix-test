import { create } from 'zustand';

type Permission = {
  id: number;
  role_code: string;
  scope_type: string;
  scope_id: number | null;
  scope_name?: string;
  course:any
};

type RoleAssignment = {
  id: number;
  user_id: number;
  role_code: string;
  scope_type: 'system' | 'domain' | 'batch' | 'team' | 'TeamMember'; // לפי האפשרויות שלך
  scope_id: number;
  createdAt: string; // או Date אם אתה מעבד את זה כ־Date
  updatedAt: string; // כנ"ל
};

type PermissionState = {
  permissions: Permission[];
  selectedPermission: Permission | null;
  setPermissions: (permissions: Permission[]) => void;
  setSelectedPermission: (permission: Permission) => void;
  userSelectData: Permission[];
  setUserSelectData: (permissions: Permission[]) => void;
};

export const usePermissionStore = create<PermissionState>((set) => ({
  permissions: [],
  selectedPermission: null, 
  setPermissions: (permissions) => set({ permissions }),
  setSelectedPermission: (permission) => set({ selectedPermission: permission }),
  userSelectData: [],
  setUserSelectData: (userSelectData) => set({ userSelectData }),
}));
