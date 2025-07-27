import React, { useState } from 'react';
import { Play, Pause, Square, RefreshCw, Filter, Download } from 'lucide-react';

export const TaskMonitor: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  
  const tasks = [
    {
      id: 1,
      name: 'E-commerce Login Automation',
      status: 'running',
      progress: 67,
      startTime: '2025-01-11 14:30:22',
      duration: '00:02:15',
      currentStep: 'Filling checkout form',
      totalSteps: 6,
      completedSteps: 4,
      logs: [
        { time: '14:30:22', level: 'info', message: 'Starting automation task' },
        { time: '14:30:23', level: 'info', message: 'Navigating to login page' },
        { time: '14:30:25', level: 'success', message: 'Login successful' },
        { time: '14:30:28', level: 'info', message: 'Adding items to cart' },
        { time: '14:32:10', level: 'warning', message: 'Slow response detected, retrying...' },
        { time: '14:32:37', level: 'info', message: 'Proceeding to checkout' },
      ]
    },
    {
      id: 2,
      name: 'Newsletter Signup Campaign',
      status: 'completed',
      progress: 100,
      startTime: '2025-01-11 14:25:10',
      duration: '00:01:45',
      currentStep: 'Task completed',
      totalSteps: 3,
      completedSteps: 3,
      logs: [
        { time: '14:25:10', level: 'info', message: 'Starting newsletter signup' },
        { time: '14:25:12', level: 'info', message: 'Filling email form' },
        { time: '14:26:55', level: 'success', message: 'Signup completed successfully' },
      ]
    },
    {
      id: 3,
      name: 'Data Extraction - Product Catalog',
      status: 'failed',
      progress: 25,
      startTime: '2025-01-11 14:20:05',
      duration: '00:00:32',
      currentStep: 'Error encountered',
      totalSteps: 8,
      completedSteps: 2,
      logs: [
        { time: '14:20:05', level: 'info', message: 'Starting data extraction' },
        { time: '14:20:08', level: 'info', message: 'Navigating to product catalog' },
        { time: '14:20:37', level: 'error', message: 'Element not found: .product-grid' },
        { time: '14:20:37', level: 'error', message: 'Task failed - element selector issue' },
      ]
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-blue-400 bg-blue-400/20';
      case 'completed': return 'text-green-400 bg-green-400/20';
      case 'failed': return 'text-red-400 bg-red-400/20';
      case 'paused': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'success': return 'text-green-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Task Monitor</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center space-x-2">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2">
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Active Tasks</h2>
          </div>
          <div className="divide-y divide-gray-700">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedTask === task.id ? 'bg-gray-700/50' : 'hover:bg-gray-700/30'
                }`}
                onClick={() => setSelectedTask(task.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{task.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Progress: {task.completedSteps}/{task.totalSteps} steps</span>
                    <span>{task.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        task.status === 'running' ? 'bg-blue-600' :
                        task.status === 'completed' ? 'bg-green-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{task.currentStep}</span>
                    <span>{task.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Task Details</h2>
              {selectedTask && (
                <div className="flex space-x-2">
                  <button className="p-2 text-green-400 hover:text-green-300 transition-colors">
                    <Play size={16} />
                  </button>
                  <button className="p-2 text-yellow-400 hover:text-yellow-300 transition-colors">
                    <Pause size={16} />
                  </button>
                  <button className="p-2 text-red-400 hover:text-red-300 transition-colors">
                    <Square size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-300 transition-colors">
                    <Download size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {selectedTask ? (
            <div className="p-6">
              {(() => {
                const task = tasks.find(t => t.id === selectedTask);
                if (!task) return null;
                
                return (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Started:</span>
                        <p className="font-medium">{task.startTime}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Duration:</span>
                        <p className="font-medium">{task.duration}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Execution Logs</h3>
                      <div className="bg-gray-900 rounded-lg p-3 max-h-64 overflow-y-auto">
                        <div className="space-y-1 font-mono text-sm">
                          {task.logs.map((log, index) => (
                            <div key={index} className="flex space-x-3">
                              <span className="text-gray-500">{log.time}</span>
                              <span className={`uppercase font-medium ${getLevelColor(log.level)}`}>
                                [{log.level}]
                              </span>
                              <span className="text-gray-300">{log.message}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-400">
              <p>Select a task to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};