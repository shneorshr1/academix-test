// components/PermissionList.tsx
import { useCalendarTasks } from "../hooks/useCalendarTasks";
import { useCalendarStore } from "../store/calendarStore";
import { usePermissionStore } from "../store/permissionStore";
import { getPermissionDisplay } from "../utils/getPermissionDisplay";
import { RoleSelect } from "./RoleSelect";

export const PermissionList = () => {
  const permissions = usePermissionStore((state) => state.permissions);
  const selectedPermission  = usePermissionStore((state) => state.selectedPermission);



  
  const start = new Date("2025-08-04T00:00:00Z").toISOString();
  const end = new Date("2025-08-04T23:59:59Z").toISOString();

  const { isLoading } = useCalendarTasks(start, end);
  const tasks = useCalendarStore((s) => s.tasks);

  if (isLoading) return <div>טוען...</div>;

  return (
    <div>
      {permissions.map((perm: any) => {
        const { label, role } = getPermissionDisplay(perm);

        return (
          <div key={`${perm.scope_type}-${perm.scope_id}`}>
            <h1>{role}</h1>
            <h2>
  {selectedPermission
    ? `${selectedPermission.scope_type} - ${selectedPermission.role_code}`
    : "לא נבחרה הרשאה"}
</h2>
            {label}


            <div className="calendar-grid">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`calendar-task status-${task.status}`}
                >
                  <span>{task.name}</span>
                </div>
              ))}
            </div>

           
          </div>
        );
      })}
    </div>
  );
};
