// components/PermissionList.tsx
import { usePermissionStore } from '../store/permissionStore';
import { getPermissionDisplay } from '../utils/getPermissionDisplay';

export const PermissionList = () => {
  const permissions = usePermissionStore((state) => state.permissions);

  console.log(permissions);
  
  return (
    <div>
      {permissions.map((perm) => {
        const { label,role } = getPermissionDisplay(perm);
        return (
          <div key={`${perm.scope_type}-${perm.scope_id}`}>

<h1>{role}</h1>

            {label}
          </div>
        );
      })}
    </div>
  );
};
