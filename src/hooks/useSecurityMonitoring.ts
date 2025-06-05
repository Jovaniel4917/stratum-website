
import { useEffect } from 'react';
import { setupCSPReporting, logSecurityEvent } from '@/utils/security';

export const useSecurityMonitoring = () => {
  useEffect(() => {
    // Set up CSP violation reporting
    setupCSPReporting();

    // Monitor for suspicious activities
    let clickCount = 0;
    let lastClickTime = 0;

    const handleSuspiciousActivity = () => {
      const now = Date.now();
      
      // Detect rapid clicking (potential bot behavior)
      if (now - lastClickTime < 100) {
        clickCount++;
        if (clickCount > 10) {
          logSecurityEvent('SUSPICIOUS_RAPID_CLICKS', { clickCount });
        }
      } else {
        clickCount = 0;
      }
      
      lastClickTime = now;
    };

    // Monitor for console manipulation attempts
    const originalConsole = window.console;
    let consoleAccessCount = 0;

    Object.defineProperty(window, 'console', {
      get: () => {
        consoleAccessCount++;
        if (consoleAccessCount > 50) {
          logSecurityEvent('EXCESSIVE_CONSOLE_ACCESS', { count: consoleAccessCount });
        }
        return originalConsole;
      },
      set: () => {
        logSecurityEvent('CONSOLE_OVERRIDE_ATTEMPT');
      }
    });

    document.addEventListener('click', handleSuspiciousActivity);

    return () => {
      document.removeEventListener('click', handleSuspiciousActivity);
    };
  }, []);
};
