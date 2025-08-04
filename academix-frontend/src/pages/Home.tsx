import CourseList from '../components/CourseList';
import Layout from '../components/layout/Layout';
import { PermissionList } from '../components/PermissionList';
import { useCourses } from '../hooks/useCourses';
import { useFetchPermissions } from '../hooks/useFetchPermissions';
import { useHasPermission } from '../hooks/useHasPermission';

export default function Home() {

    useFetchPermissions();
  const { data: courses, isLoading, isError } = useCourses();
  
  const canManageDomains = useHasPermission('ADMIN', 'system');
  
  if (isLoading) return <div>טוען קורסים...</div>;
  if (isError) return <div>שגיאה בטעינת קורסים</div>;

  return (
    <div>
      <PermissionList/>
    </div>
  );
}
