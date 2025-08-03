import { create } from 'zustand';
import { Course } from '../hooks/useCourses';

interface CourseStore {
  courses: Course[];
  selectedCourse: Course | null;
  setCourses: (courses: Course[]) => void;
  setSelectedCourse: (course: Course) => void;
  clearSelectedCourse: () => void;
}

export const useCourseStore = create<CourseStore>((set) => ({
  courses: [],
  selectedCourse: null,
  setCourses: (courses) => set({ courses }),
  setSelectedCourse: (course) => set({ selectedCourse: course }),
  clearSelectedCourse: () => set({ selectedCourse: null }),
}));
