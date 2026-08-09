import React from 'react';
import { cn } from '../../utils/index.js';

// Professional Female Executive Administrator Vector Avatar (Priya Nambiar)
const FemaleAdminAvatar = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="64" height="64" rx="32" fill="#0B3D91" />
    <circle cx="32" cy="24" r="11" fill="#FFD1B3" />
    <path d="M20 20C20 13 25 9 32 9C39 9 44 13 44 20C44 22 43 25 43 25C40 21 34 20 32 20C30 20 24 21 21 25C21 25 20 22 20 20Z" fill="#2D1B18" />
    <path d="M16 56C16 44 23 37 32 37C41 37 48 44 48 56H16Z" fill="#1E293B" />
    <path d="M28 37L32 46L36 37H28Z" fill="#E2E8F0" />
    <path d="M30 46L32 54L34 46H30Z" fill="#B83E12" />
  </svg>
);

// Professional Driver Pilot Vector Avatar (Vikram Jadhav)
const DriverPilotAvatar = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="64" height="64" rx="32" fill="#0284C7" />
    <circle cx="32" cy="26" r="11" fill="#FCD34D" />
    <path d="M19 19C19 19 24 16 32 16C40 16 45 19 45 19V22H19V19Z" fill="#0F172A" />
    <path d="M16 19C16 19 24 14 32 14C40 14 48 19 48 19V21H16V19Z" fill="#1E293B" />
    <circle cx="32" cy="18" r="2" fill="#F59E0B" />
    <path d="M16 56C16 45 23 38 32 38C41 38 48 45 48 56H16Z" fill="#0F172A" />
    <path d="M26 38L32 46L38 38H26Z" fill="#FFFFFF" />
  </svg>
);

// Professional Commuter Vector Avatar (Aarav Sharma)
const PassengerAvatar = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="64" height="64" rx="32" fill="#10B981" />
    <circle cx="32" cy="24" r="11" fill="#FDE047" />
    <path d="M21 21C21 15 26 10 32 10C38 10 43 15 43 21V25H21V21Z" fill="#334155" />
    <path d="M16 56C16 44 23 37 32 37C41 37 48 44 48 56H16Z" fill="#047857" />
    <path d="M28 37L32 44L36 37H28Z" fill="#FFFFFF" />
  </svg>
);

// Professional SOC Engineer Vector Avatar (Devraj Sen)
const SocEngineerAvatar = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="64" height="64" rx="32" fill="#D97706" />
    <circle cx="32" cy="24" r="11" fill="#FDBA74" />
    <path d="M20 20C20 14 25 10 32 10C39 10 44 14 44 20V24H20V20Z" fill="#1E293B" />
    <path d="M16 22H19V30H16V22Z" fill="#F59E0B" />
    <path d="M45 22H48V30H45V22Z" fill="#F59E0B" />
    <path d="M18 20C18 20 25 15 32 15C39 15 46 20 46 20" stroke="#F59E0B" strokeWidth="3" />
    <path d="M16 56C16 44 23 37 32 37C41 37 48 44 48 56H16Z" fill="#334155" />
  </svg>
);

export function UserAvatar({
  name = 'User',
  role = 'admin',
  size = 'md',
  status = 'online',
  className = '',
}) {
  const normalizedRole = (role || 'admin').toLowerCase();

  // Size mapping
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  }[size] || 'w-10 h-10 text-sm';

  const statusDotSizes = {
    sm: 'w-2 h-2 border',
    md: 'w-2.5 h-2.5 border-2',
    lg: 'w-3 h-3 border-2',
  }[size] || 'w-2.5 h-2.5 border-2';

  const statusColors = {
    online: 'bg-emerald-500',
    busy: 'bg-amber-500',
    offline: 'bg-slate-400',
  }[status] || 'bg-emerald-500';

  // Fallback initials badge
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'US';

  // Deterministically select human vector avatar based on role/name
  const renderAvatarSvg = () => {
    if (normalizedRole === 'admin') {
      return <FemaleAdminAvatar />;
    }
    if (normalizedRole === 'driver') {
      return <DriverPilotAvatar />;
    }
    if (normalizedRole === 'passenger') {
      return <PassengerAvatar />;
    }
    if (normalizedRole === 'systemadmin' || normalizedRole === 'soc') {
      return <SocEngineerAvatar />;
    }
    return <FemaleAdminAvatar />;
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center shrink-0 select-none', className)}>
      <div className={cn('rounded-full overflow-hidden shadow-xs ring-2 ring-white/20', sizeClasses)}>
        {renderAvatarSvg()}
      </div>

      {/* Online/Busy/Offline Status Badge */}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-white dark:border-slate-900 shadow-xs',
            statusDotSizes,
            statusColors
          )}
          title={`Status: ${status}`}
        />
      )}
    </div>
  );
}

export default UserAvatar;
