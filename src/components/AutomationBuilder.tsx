import React, { useState } from 'react';
import { Plus, Save, Play, Eye, Code, MousePointer, Keyboard, Clock } from 'lucide-react';

export const AutomationBuilder: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [automationSteps, setAutomationSteps] = useState([
    { id: 1, type: 'navigate', config: { url: 'https://example.com/login' } },
    { id: 2, type: 'input', config: { selector: '#username', value: 'user@example.com' } },
    { id: 3, type: 'input', config: { selector: '#password', value: '********' } },
    { id: 4, type: 'click', config: { selector: '#login-button' } },
  ]);

  const actionTypes = [
    { id: 'navigate', label: 'Navigate to URL', icon: Eye, color: 'bg-blue-600' },
    { id: 'click', label: 'Click Element', icon: MousePointer, color: 'bg-green-600' },
    { id: 'input', label: 'Fill Input', icon: Keyboard, color: 'bg-purple-600' },
    { id: 'wait', label: 'Wait/Delay', icon: Clock, color: 'bg-yellow-600' },
  ];

  const addStep = (type: string) => {
    const newStep = {
      id: Date.now(),
      type,
      config: type === 'navigate' ? { url: '' } : type === 'input' ? { selector: '', value: '' } : { selector: '' }
    };
    setAutomationSteps([...automationSteps, newStep]);
  };

  const removeStep = (id: number) => {
    setAutomationSteps(automationSteps.filter(step => step.id !== id));
  };

  const getStepIcon = (type: string) => {
    const actionType = actionTypes.find(a => a.id === type);
    if (!actionType) return <Code size={16} />;
    const Icon = actionType.icon;
    return <Icon size={16} />;
  };

  const getStepColor = (type: string) => {
    const actionType = actionTypes.find(a => a.id === type);
    return actionType?.color || 'bg-gray-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Automation Builder</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center space-x-2">
            <Play size={16} />
            <span>Test Run</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2">
            <Save size={16} />
            <span>Save Script</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Automation Steps</h2>
            <div className="space-y-3">
              {automationSteps.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="text-sm font-medium text-gray-400">#{index + 1}</div>
                    <div className={`p-2 rounded-lg ${getStepColor(step.type)}`}>
                      {getStepIcon(step.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium capitalize">{step.type} Action</p>
                      <p className="text-sm text-gray-400">
                        {step.type === 'navigate' && `URL: ${step.config.url}`}
                        {step.type === 'input' && `Selector: ${step.config.selector}, Value: ${step.config.value}`}
                        {step.type === 'click' && `Selector: ${step.config.selector}`}
                        {step.type === 'wait' && `Duration: ${step.config.duration || '1000'}ms`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeStep(step.id)}
                    className="px-3 py-1 text-red-400 hover:text-red-300 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              {automationSteps.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Code size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No automation steps yet. Add your first action to get started.</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Script Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Script Name</label>
                <input
                  type="text"
                  placeholder="Login Automation Script"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Target Browser</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Chrome</option>
                  <option>Firefox</option>
                  <option>Safari</option>
                  <option>Edge</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Timeout (seconds)</label>
                <input
                  type="number"
                  placeholder="30"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Retry Attempts</label>
                <input
                  type="number"
                  placeholder="3"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Add Actions</h2>
            <div className="space-y-3">
              {actionTypes.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => addStep(action.id)}
                    className="w-full flex items-center space-x-3 p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <Icon size={16} />
                    </div>
                    <span className="font-medium">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Quick Templates</h2>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors">
                <p className="font-medium">Login Form</p>
                <p className="text-sm text-gray-400">Username & password login</p>
              </button>
              <button className="w-full text-left p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors">
                <p className="font-medium">Contact Form</p>
                <p className="text-sm text-gray-400">Name, email, message fields</p>
              </button>
              <button className="w-full text-left p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors">
                <p className="font-medium">Registration</p>
                <p className="text-sm text-gray-400">Multi-step signup process</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};