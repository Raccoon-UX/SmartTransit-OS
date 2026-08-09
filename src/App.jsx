import React from 'react';
import { ThemeProvider } from './design-system/context/ThemeContext.jsx';
import { ToastProvider } from './components/ui/Toast.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { PublicAccessibilityProvider } from './context/PublicAccessibilityContext.jsx';
import { AppRouter } from './routes/AppRouter.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <PublicAccessibilityProvider>
            <AppRouter />
          </PublicAccessibilityProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
