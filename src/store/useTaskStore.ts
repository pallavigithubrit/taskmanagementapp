import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, Priority, Status } from '../types/task';

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  filterTasks: (status?: Status, priority?: Priority) => Task[];
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      
      addTask: (taskData) => {
        const newTask: Task = {
          id: crypto.randomUUID(),
          ...taskData,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
      },
      
      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updates, updatedAt: new Date() }
              : task
          ),
        }));
      },
      
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
      
      filterTasks: (status, priority) => {
        const { tasks } = get();
        return tasks.filter((task) => {
          const statusMatch = !status || task.status === status;
          const priorityMatch = !priority || task.priority === priority;
          return statusMatch && priorityMatch;
        });
      },
    }),
    {
      name: 'task-storage',
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);