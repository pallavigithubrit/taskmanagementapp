import React from 'react';
import { Clock, Tag, CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { Task, Priority, Status } from '../types/task';
import { format } from 'date-fns';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (id: string, updates: Partial<Task>) => void;
  onTaskDelete: (id: string) => void;
}

const priorityColors: Record<Priority, string> = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const statusIcons: Record<Status, React.ReactNode> = {
  todo: <Circle className="h-5 w-5 text-gray-400" />,
  'in-progress': <Clock className="h-5 w-5 text-blue-500" />,
  complete: <CheckCircle className="h-5 w-5 text-green-500" />,
};

export function TaskList({ tasks, onTaskUpdate, onTaskDelete }: TaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <button
                onClick={() => {
                  const nextStatus: Record<Status, Status> = {
                    todo: 'in-progress',
                    'in-progress': 'complete',
                    complete: 'todo',
                  };
                  onTaskUpdate(task.id, { status: nextStatus[task.status] });
                }}
              >
                {statusIcons[task.status]}
              </button>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                {task.description && (
                  <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                )}
                
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  {task.dueDate && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {format(new Date(task.dueDate), 'MMM d, yyyy h:mm a')}
                    </div>
                  )}
                  
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                </div>

                {task.labels.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {task.labels.map((label) => (
                      <span
                        key={label}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => onTaskDelete(task.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <AlertCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}