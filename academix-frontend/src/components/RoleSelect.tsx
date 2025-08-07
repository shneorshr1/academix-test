import { useRoleAssignments } from "../hooks/useRoleAssignments";
import { usePermissionStore } from "../store/permissionStore";

export const RoleSelect = () => {
    const { permissions, selectedPermission, setSelectedPermission } = usePermissionStore();
   
  
    return (
      <select
        value={selectedPermission?.id || ""}
        onChange={(e) => {
          const role = permissions.find((p) => p.id === Number(e.target.value));
          
          if (role) setSelectedPermission(role);
        }}
      >
        {permissions.map((role) => (
          <option key={role.id} value={role.id}>
            {role.scope_type} - {role.role_code}
          </option>
        ))}
      </select>
    );
  };
  