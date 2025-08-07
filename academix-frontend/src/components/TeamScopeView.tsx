// components/TeamScopeView.tsx
import TeamAxes from "./TeamAxes";

export const TeamScopeView = ({ permission }: { permission: any }) => {
  const team = permission.team;

  
  if (!team) return <div>לא נמצא מידע על הצוות</div>;

  console.log(team);
  console.log(team.courseBatch?.name);
  
  return (
    <div>
      <h2>צוות: {team.name}</h2>
      <h3>מחזור: {team.CourseBatch?.name}</h3>
      <h3>קורס: {team.CourseBatch?.Course?.name}</h3>
      <h3>דומיין: {team.CourseBatch?.Course?.Domain?.name}</h3>

      <div key={team.id} style={{ marginBottom: '1.5rem' }}>
             <h3>צוות: {team.name}</h3>
     
             {team.teamMembers?.map((member: any, idx: number) => (
               <div key={idx} style={{ paddingLeft: '1rem', marginBottom: '1rem' }}>
                 <strong>חבר צוות:</strong> {member.User?.name ?? "לא נמצא שם"}
     
                 <TeamAxes teamId={team.id} />
     
                 {member.User?.TaskAssignments?.length > 0 ? (
                   <ul style={{ paddingLeft: '1.5rem' }}>
                     {member.User.TaskAssignments.map((assign: any) => (
                       <li key={assign.id} style={{ marginTop: '0.3rem' }}>
                         🗂️ <strong>משימה:</strong> {assign.Task?.name || 'משימה ללא שם'} <br />
                         🏷️ <strong>סטטוס:</strong> {assign.status} <br />
                         📅 <strong>הוקצתה בתאריך:</strong> {new Date(assign.assigned_at).toLocaleDateString()}
                       </li>
                     ))}
                   </ul>
                 ) : (
                   <div style={{ paddingLeft: '1rem', color: 'gray' }}>אין משימות לחבר צוות זה</div>
                 )}
               </div>
             ))}
           </div>
    </div>
  );
};
