export function getPermissionDisplay(permission: any) {
  
  
  // console.log(permission);
  
  switch (permission?.scope_type) {
    case 'system':
      return {
        label: `${permission.system.length + " קורסים ישנם   " || ''}`,
        role:"אדמין"
      };
    case 'domain':
      return {
        label: `תחום: ${permission.domain?.name || ''}`,
        role:"מפקד תחום"
      };
      
      case 'course':
        return {
          label: `מחזור: ${permission.course?.CourseBatches[0].name || ''} | קורס: ${permission.course?.name || ''} | תחום: ${permission.course?.Domain?.name || ''}`,
          role:"מפקד קורס"
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
