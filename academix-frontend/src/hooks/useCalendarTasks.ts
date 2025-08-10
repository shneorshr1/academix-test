import { useQuery } from 'react-query';
import { useCalendarStore } from "../store/calendarStore";
import api from "../api/axios";

export interface CalendarTask {
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

export const fetchCalendarTasks = async (start: string, end: string): Promise<CalendarTask[]> => {
  const { data } = await api.get("/calendar", { params: { start, end } });
  return data;
};

export const useCalendarTasks = (start: string, end: string) => {
  const setTasks = useCalendarStore((s) => s.setTasks);

  return useQuery({
    queryKey: ["calendarTasks", start, end],
    queryFn: () => fetchCalendarTasks(start, end),
    onSuccess: (data) => setTasks(data),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity, 
  });
  
};
