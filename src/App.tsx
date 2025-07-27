import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { AutomationBuilder } from './components/AutomationBuilder';
import { TaskMonitor } from './components/TaskMonitor';
import { Settings } from './components/Settings';
import { Sidebar } from './components/Sidebar';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'builder':
        return <AutomationBuilder />;
      case 'monitor':
        return <TaskMonitor />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;