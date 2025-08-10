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
  teamId: number | null;
};

const TeamAxes: React.FC<Props> = ({ teamId }) => {

   const { data: axes } =  useFetchAxes({ scope_type: "team", scope_id :teamId  });
    const teamAxes = axes

  if (teamAxes?.length === 0) return null;

  return (
    <div style={{ paddingRight: "1rem", marginTop: "1rem",background:'pink' }}>
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
