import { useEffect } from 'react';
import CourseList from '../components/CourseList';
import Layout from '../components/layout/Layout';
import { PermissionList } from '../components/PermissionList';
import { useCourses } from '../hooks/useCourses';
import { useFetchPermissions } from '../hooks/useFetchPermissions';
import { useHasPermission } from '../hooks/useHasPermission';
import { usePermissionStore } from '../store/permissionStore';
import { getPermissionDisplay } from '../utils/getPermissionDisplay';

export default function Home() {


useFetchPermissions();
const selectedPermission = usePermissionStore((state) => state.selectedPermission);

const { label, role } = getPermissionDisplay(selectedPermission);

  return (
    <div>
      <h1>{role}</h1>
      <h2>{label}</h2>

      
      {/*
      דוגמאות לשליפות לפי סוגי הרשאות - אםשר לשחק עם זה ולראות בעין- תעברו על זה
      <PermissionList/> */}
    </div>
  );
}
