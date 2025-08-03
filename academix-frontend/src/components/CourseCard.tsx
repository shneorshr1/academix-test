// src/components/CourseCard.tsx
import React from 'react';

type Props = {
  course: {
    id: number;
    name: string;
    symbol: string;
  };
  onSelect: () => void;
};

export default function CourseCard({ course, onSelect }: Props) {
  return (
    <div onClick={onSelect}>
      <h3>{course.name}</h3>
      <p>{course.symbol}</p>
    </div>
  );
}
