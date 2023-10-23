export type TaskItem = {
  content: string;
  id: number;
  category: string;
  children: TaskItem[];
};
