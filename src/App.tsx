/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppView, UserRole } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PublicLanding } from './components/PublicLanding';
import { RoleSelector } from './components/RoleSelector';
import { RoleWelcome } from './components/RoleWelcome';
import { ConsumerDashboard } from './components/consumer/ConsumerDashboard';
import { EmployeeDashboard } from './components/employee/EmployeeDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleNavigate = (view: AppView, role: UserRole | null = null) => {
    setCurrentView(view);
    setSelectedRole(role);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreDemo = () => {
    handleNavigate('roles');
  };

  const handleSelectRole = (role: UserRole) => {
    if (role === 'consumidor') {
      handleNavigate('consumidor', 'consumidor');
    } else if (role === 'empleado') {
      handleNavigate('empleado', 'empleado');
    } else {
      handleNavigate('welcome', role);
    }
  };

  const handleBackToRoles = () => {
    handleNavigate('roles', null);
  };

  const handleBackToLanding = () => {
    handleNavigate('landing', null);
  };

  return (
    <div
      id="app-root-container"
      className="min-h-screen flex flex-col bg-[#F7F8FC] text-[#172033] font-['Plus_Jakarta_Sans',sans-serif]"
    >
      {/* Persistent Navigation Header */}
      <Header
        currentView={currentView}
        selectedRole={selectedRole}
        onNavigate={handleNavigate}
      />

      {/* Main Content Router */}
      <main id="main-content-area" className="flex-1 flex flex-col">
        {currentView === 'landing' && (
          <PublicLanding onExploreDemo={handleExploreDemo} />
        )}

        {currentView === 'roles' && (
          <RoleSelector
            onSelectRole={handleSelectRole}
            onBackToLanding={handleBackToLanding}
          />
        )}

        {currentView === 'welcome' && selectedRole && (
          <RoleWelcome
            role={selectedRole}
            onBackToRoles={handleBackToRoles}
            onBackToLanding={handleBackToLanding}
          />
        )}

        {currentView === 'consumidor' && (
          <ConsumerDashboard
            onBackToRoles={handleBackToRoles}
            onBackToLanding={handleBackToLanding}
          />
        )}

        {currentView === 'empleado' && (
          <EmployeeDashboard
            onBackToRoles={handleBackToRoles}
            onBackToLanding={handleBackToLanding}
          />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

