import { useRoleAssignments } from "../hooks/useRoleAssignments";
import { usePermissionStore } from "../store/permissionStore";

export const RoleSelect = () => {
    const { permissions, selectedPermission, setSelectedPermission } = usePermissionStore();
    const { isLoading } = useRoleAssignments(); // הפעלת ה-hook ושמירת מצב טעינה
  
    if (isLoading) return <p>טוען הרשאות...</p>;
  
    console.log("selectedPermission:", selectedPermission);
    console.log("permissions:", permissions);
  
    return (
      <select
        value={selectedPermission?.id || ""}
        onChange={(e) => {
          const role = permissions.find((p) => p.id === Number(e.target.value));
          if (role) setSelectedPermission(role);
        }}
      >
        <option value="">בחר הרשאה</option>
        {permissions.map((role) => (
          <option key={role.id} value={role.id}>
            {role.scope_type} - {role.role_code}
          </option>
        ))}
      </select>
    );
  };
  