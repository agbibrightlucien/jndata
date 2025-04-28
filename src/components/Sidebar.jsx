import React from 'react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Orders', icon: '📦' },
    { name: 'Sub-vendors', icon: '👥' },
    { name: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed left-0 top-0 p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Vendor Portal</h2>
      </div>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href="#"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;