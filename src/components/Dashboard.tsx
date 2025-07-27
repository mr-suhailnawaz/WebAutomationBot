import React from 'react';
import { Play, Pause, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Active Tasks', value: '12', icon: Play, color: 'bg-blue-600' },
    { label: 'Completed Today', value: '247', icon: CheckCircle, color: 'bg-green-600' },
    { label: 'Failed Tasks', value: '3', icon: XCircle, color: 'bg-red-600' },
    { label: 'Success Rate', value: '98.8%', icon: TrendingUp, color: 'bg-purple-600' },
  ];

  const recentTasks = [
    { id: 1, name: 'Login Automation - Banking Site', status: 'completed', duration: '2.3s', timestamp: '2 minutes ago' },
    { id: 2, name: 'Form Fill - Registration Page', status: 'running', duration: '1.1s', timestamp: '5 minutes ago' },
    { id: 3, name: 'Data Extraction - E-commerce', status: 'completed', duration: '4.7s', timestamp: '12 minutes ago' },
    { id: 4, name: 'Newsletter Signup Automation', status: 'failed', duration: '0.8s', timestamp: '18 minutes ago' },
    { id: 5, name: 'Survey Form Completion', status: 'completed', duration: '3.2s', timestamp: '25 minutes ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/20';
      case 'running': return 'text-blue-400 bg-blue-400/20';
      case 'failed': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} />;
      case 'running': return <Clock size={16} className="animate-spin" />;
      case 'failed': return <XCircle size={16} />;
      default: return <Pause size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            New Task
          </button>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            Import Scripts
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-1.5 rounded-full ${getStatusColor(task.status)}`}>
                    {getStatusIcon(task.status)}
                  </div>
                  <div>
                    <p className="font-medium">{task.name}</p>
                    <p className="text-sm text-gray-400">{task.timestamp}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{task.duration}</p>
                  <p className={`text-xs capitalize ${getStatusColor(task.status).split(' ')[0]}`}>
                    {task.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Success Rate</span>
                <span>98.8%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '98.8%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Average Response Time</span>
                <span>2.1s</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Resource Usage</span>
                <span>34%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '34%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};