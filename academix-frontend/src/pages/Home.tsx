import { useEffect } from 'react';
import CourseList from '../components/CourseList';
import Layout from '../components/layout/Layout';
import { PermissionList } from '../components/PermissionList';
import { useCourses } from '../hooks/useCourses';
import { useFetchPermissions } from '../hooks/useFetchPermissions';
import { useHasPermission } from '../hooks/useHasPermission';

export default function Home() {


    useFetchPermissions();

  return (
    <div>
      <PermissionList/>
    </div>
  );
}
