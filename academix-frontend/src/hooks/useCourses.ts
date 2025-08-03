import { useQuery } from 'react-query';
import api from '../api/axios';
import { useCourseStore } from '../store/courseStore'; 

export type Course = {
  id: number;
  name: string;
  domainId: number;
};

export const useCourses = () => {
  const setCourses = useCourseStore((state) => state.setCourses);

  return useQuery<Course[]>('courses', async () => {
    const { data } = await api.get('/courses');
    setCourses(data); 
    return data;
  });
};
