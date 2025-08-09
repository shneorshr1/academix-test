import { useRoleAssignments } from "../hooks/useRoleAssignments";
import { usePermissionStore } from "../store/permissionStore";
import { Select } from "antd";

export const RoleSelect = () => {
    const { permissions, selectedPermission, setSelectedPermission } = usePermissionStore();
   
  
    return (
      <Select
      value={selectedPermission?.id}
      onChange={(value) => {
        const role = permissions.find(p => p.id === Number(value));
        if (role) setSelectedPermission(role);
      }}
      options={permissions.map(p => ({
        value: p.id,
        label: `${p.scope_type} - ${p.role_code}`,
      }))}
      style={{ width: 280 }}
      placeholder="בחר הרשאה"
    />
    );
  };
  