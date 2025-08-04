export function getPermissionDisplay(permission: any) {
  
  switch (permission.scope_type) {
    case 'domain':
      return {
        label: `תחום: ${permission.domain?.name || ''}`,
        role:"דומיין"
      };
      
      case 'batch':
        return {
          label: `מחזור: ${permission.batch?.name || ''} | קורס: ${permission.batch?.Course?.name || ''} | תחום: ${permission.batch?.Course?.Domain?.name || ''}`,
          role:"מפקד קורס על מחזור"
        };
        
        case 'team':
          return {
            label: `צוות: ${permission.team?.name || ''} | מחזור: ${permission.team?.CourseBatch?.name || ''} | קורס: ${permission.team?.CourseBatch?.Course?.name || ''} | תחום: ${permission.team?.CourseBatch?.Course?.Domain?.name || ''}`,
            role: permission.role_code == "STUDENT" ?  "חניך בצוות" : "מפקד צוות"
      };

 
    default:
      return { label: '' };
  }
}
