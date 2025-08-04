import { create } from "zustand";



 interface CalendarTask {
    id: number;
    name: string;
    due_date: string;
    status: string;
    taskGroup?: {
      axis?: {
        courseBatch?: {
          name: string;
          course?: { name: string; domain?: { name: string } };
        };
      };
    };
    taskAssignments?: Array<{
      user?: { id: number; name: string };
      team?: { id: number; name: string };
    }>;
  }

interface CalendarState {
  tasks: CalendarTask[];
  setTasks: (tasks: CalendarTask[]) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks })
}));
