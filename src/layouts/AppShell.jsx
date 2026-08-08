import React, { useState } from 'react';
import { AppHeader } from './AppHeader.jsx';
import { AppSidebar } from './AppSidebar.jsx';
import { MobileNavigation } from './MobileNavigation.jsx';
import { Workspace } from './Workspace.jsx';
import { GlobalSearch } from '../components/search/GlobalSearch.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { cn } from '../utils/index.js';

export function AppShell({
  children,
  currentRole,
  onRoleChange,
  activeItemId = 'dashboard',
  onSelectItem,
  fluidWorkspace = false,
  className = '',
}) {
  const { role: authRole, demoLogin } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Authenticated user's role is the primary source of truth
  const effectiveRole = authRole || currentRole || 'passenger';

  const handleRoleChange = (newRole) => {
    demoLogin(newRole);
    if (onRoleChange) {
      onRoleChange(newRole);
    }
  };

  return (
    <div className={cn('min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 flex flex-col', className)}>
      {/* Top Application Header */}
      <AppHeader
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onOpenMobileNav={() => setMobileNavOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        currentRole={effectiveRole}
        onRoleChange={handleRoleChange}
      />

      {/* Body Frame: Desktop Sidebar + Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <AppSidebar
          currentRole={effectiveRole}
          activeItemId={activeItemId}
          onSelectItem={onSelectItem}
          collapsed={sidebarCollapsed}
        />

        {/* Mobile Navigation Drawer */}
        <MobileNavigation
          isOpen={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
          currentRole={effectiveRole}
          onRoleChange={handleRoleChange}
          activeItemId={activeItemId}
          onSelectItem={onSelectItem}
        />

        {/* Main Content Workspace */}
        <Workspace fluid={fluidWorkspace}>
          {children}
        </Workspace>
      </div>

      {/* Global Search Command Palette Modal */}
      <GlobalSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={(item) => {
          console.log('Selected item from search:', item);
        }}
      />
    </div>
  );
}

export default AppShell;
