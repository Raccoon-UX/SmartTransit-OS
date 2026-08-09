import React from 'react';
import { PublicHeader } from '../components/public/PublicHeader.jsx';

export function PublicNavbar({ onOpenDemo, onOpenSignIn, onSwitchToShell }) {
  return (
    <PublicHeader
      onOpenDemo={onOpenDemo}
      onOpenSignIn={onOpenSignIn}
      onSwitchToShell={onSwitchToShell}
    />
  );
}

export default PublicNavbar;
