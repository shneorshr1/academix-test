import React from 'react';
import { useCourses } from '../hooks/useCourses';
import { useCourseStore } from '../store/courseStore';

const CourseList = () => {
  const { data: courses, isLoading, isError } = useCourses();
  const selectedCourse = useCourseStore((state) => state.selectedCourse);
  const setSelectedCourse = useCourseStore((state) => state.setSelectedCourse);

  console.log(selectedCourse);
  
  if (isLoading) return <p>טוען קורסים...</p>;
  if (isError || !courses) return <p>שגיאה בטעינת הקורסים</p>;

  return (
    <div>
      <h2>רשימת קורסים</h2>
      <ul>
        {courses.map((course) => (
          <li
            key={course.id}
            onClick={() => setSelectedCourse(course)}
            style={{
              cursor: 'pointer',
              fontWeight: selectedCourse?.id === course.id ? 'bold' : 'normal',
              color: selectedCourse?.id === course.id ? 'blue' : 'black',
            }}
          >
            {course.name}
          </li>
        ))}
      </ul>

      {selectedCourse && (
        <div style={{ marginTop: '20px' }}>
          <h3>פרטי קורס נבחר:</h3>
          <p><strong>שם:</strong> {selectedCourse.name}</p>
          <p><strong>ID:</strong> {selectedCourse.id}</p>
          <p><strong>Domain ID:</strong> {selectedCourse?.domainId}</p>
          {/* תוכל להוסיף שדות נוספים */}
        </div>
      )}
    </div>
  );
};

export default CourseList;
