import React, { useState } from 'react';
import { Plus, List, LayoutGrid } from 'lucide-react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { useTaskStore } from './store/useTaskStore';
import { Status, Priority } from './types/task';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | undefined>();
  const [selectedPriority, setSelectedPriority] = useState<Priority | undefined>();
  
  const { tasks, addTask, updateTask, deleteTask, filterTasks } = useTaskStore();
  const filteredTasks = filterTasks(selectedStatus, selectedPriority);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Task
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex space-x-4">
          <select
            value={selectedStatus || ''}
            onChange={(e) => setSelectedStatus(e.target.value as Status || undefined)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Status</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>

          <select
            value={selectedPriority || ''}
            onChange={(e) => setSelectedPriority(e.target.value as Priority || undefined)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-lg font-medium mb-4">Create New Task</h2>
              <TaskForm
                onSubmit={(data) => {
                  addTask({ ...data, labels: [] });
                  setIsFormOpen(false);
                }}
              />
              <button
                onClick={() => setIsFormOpen(false)}
                className="mt-4 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <TaskList
          tasks={filteredTasks}
          onTaskUpdate={updateTask}
          onTaskDelete={deleteTask}
        />
      </main>
    </div>
  );
}

export default App;