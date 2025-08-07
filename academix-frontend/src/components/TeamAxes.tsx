// components/TeamAxes.tsx
import React from "react";
import { useFetchAxes } from "../hooks/useFetchAxes";

type Axis = {
  id: number;
  name: string;
  courseId: number;
  team_id: number | null;
  createdAt: string;
};

type Props = {
  teamId: number;
};

const TeamAxes: React.FC<Props> = ({ teamId }) => {

    console.log(teamId);
    

    const { data: axes } = useFetchAxes();

    console.log(axes);
    

  const teamAxes = axes/* ?.filter((axis:any) => axis.team_id === teamId); */

  console.log(teamAxes);
  
  if (teamAxes?.length === 0) return null;

  return (
    <div style={{ paddingRight: "1rem", marginTop: "1rem" }}>
      <h4 style={{ fontWeight: "bold" }}>🧭 צירים לצוות זה:</h4>
      <ul style={{ paddingRight: "1rem" }}>
        {teamAxes?.map((axis:any) => (
          <li key={axis.id} style={{ marginBottom: "0.3rem" }}>
            <strong>📌 {axis.name}</strong> (קורס {axis.courseId})<br />
            <span style={{ color: "gray", fontSize: "0.8rem" }}>
              נוצר בתאריך: {new Date(axis.createdAt).toLocaleDateString("he-IL")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamAxes;
