import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 bg-gray-100 min-h-screen">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;