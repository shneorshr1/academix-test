import { usePermissionStore } from '../store/permissionStore';

export const useHasPermission = (roleCode: string, scopeType?: string, scopeId?: number) => {
  const permissions = usePermissionStore((state) => state.permissions);

  return permissions.some((perm) => {
    if (perm.role_code !== roleCode) return false;
    if (scopeType && perm.scope_type !== scopeType) return false;
    if (scopeId && perm.scope_id !== scopeId) return false;
    return true;
  });
};
