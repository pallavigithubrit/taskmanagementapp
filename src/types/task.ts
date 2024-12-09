export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'complete';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: Priority;
  status: Status;
  labels: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SubTask extends Task {
  parentId: string;
  level: number;
}