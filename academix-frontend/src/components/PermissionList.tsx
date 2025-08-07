// components/PermissionList.tsx
import { useCourses } from "../hooks/useCourses";
import { usePermissionStore } from "../store/permissionStore";
import { getPermissionDisplay } from "../utils/getPermissionDisplay";
import { CourseScopeView } from "./CourseScopeView";
import TeamAxes from "./TeamAxes";
import { TeamScopeView } from "./TeamScopeView";

export const PermissionList = () => {
  useCourses();

  const selectedPermission = usePermissionStore((state) => state.selectedPermission);
  const { label, role } = getPermissionDisplay(selectedPermission);

  if (!selectedPermission) return <div>לא נבחרה הרשאה</div>;

  return (
    <div>
      <div key={`${selectedPermission.scope_type}-${selectedPermission.scope_id}`}>
        <h1>{role}</h1>
        {label}
        <div style={{ marginTop: '2rem' }}>
        
          {selectedPermission.scope_type === "course" && (
            <CourseScopeView permission={selectedPermission} />
          )}
          {selectedPermission.scope_type === "team" && (
            <TeamScopeView permission={selectedPermission} />
          )}
        </div>
      </div>
    </div>
  );
};
