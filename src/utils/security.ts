
import DOMPurify from 'dompurify';

export const sanitizeInput = (input: string): string => {
  // First sanitize with DOMPurify to remove any HTML/script content
  const purified = DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [] // No attributes allowed
  });
  
  // Then apply additional sanitization
  return purified
    .replace(/[<>]/g, '') // Remove any remaining angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data URLs
    .replace(/vbscript:/gi, '') // Remove vbscript URLs
    .trim()
    .slice(0, 1000); // Limit length
};

export const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
    ALLOWED_ATTR: []
  });
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

export const validateRequired = (value: string, minLength = 1): boolean => {
  return value.trim().length >= minLength;
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

export const generateHoneypotField = (): string => {
  return Math.random().toString(36).substring(7);
};

// Enhanced rate limiting with better tracking
export const checkRateLimit = (): { allowed: boolean; timeLeft?: number } => {
  const key = 'contact_form_submissions';
  const now = Date.now();
  const submissions = JSON.parse(localStorage.getItem(key) || '[]');
  
  // Remove submissions older than 15 minutes
  const recent = submissions.filter((time: number) => now - time < 15 * 60 * 1000);
  
  if (recent.length >= 3) {
    const oldestRecent = Math.min(...recent);
    const timeLeft = Math.ceil((oldestRecent + 15 * 60 * 1000 - now) / 1000 / 60);
    return { allowed: false, timeLeft };
  }
  
  // Add current submission
  recent.push(now);
  localStorage.setItem(key, JSON.stringify(recent));
  
  return { allowed: true };
};

// Security event logging
export const logSecurityEvent = (event: string, details: any = {}) => {
  const securityLog = {
    timestamp: new Date().toISOString(),
    event,
    details,
    userAgent: navigator.userAgent.substring(0, 100),
    url: window.location.href,
    referrer: document.referrer
  };
  
  console.warn('[Security Event]', securityLog);
  
  // Store in localStorage for debugging (limit to last 10 events)
  const logs = JSON.parse(localStorage.getItem('security_logs') || '[]');
  logs.push(securityLog);
  if (logs.length > 10) logs.shift();
  localStorage.setItem('security_logs', JSON.stringify(logs));
};

// Content Security Policy violation handler
export const setupCSPReporting = () => {
  document.addEventListener('securitypolicyviolation', (e) => {
    logSecurityEvent('CSP_VIOLATION', {
      blockedURI: e.blockedURI,
      violatedDirective: e.violatedDirective,
      originalPolicy: e.originalPolicy
    });
  });
};
