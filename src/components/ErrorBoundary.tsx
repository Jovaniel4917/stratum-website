
import React from 'react';
import { Button } from "@/components/ui/button";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<{ error?: Error; resetError: () => void }> = ({ error, resetError }) => {
  // Don't use useLanguage here - it might fail if LanguageProvider errored
  // Use hardcoded text to ensure error boundary always works
  
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-white">
      <div className="text-center max-w-md">
        <h2 className="font-telegraf font-bold text-2xl text-primary mb-4">
          Something went wrong
        </h2>
        <p className="font-telegraf text-gray-600 mb-6">
          The application encountered an error. Please try again or contact support if the problem persists.
        </p>
        {error && (
          <details className="text-left mb-4 p-4 bg-gray-50 rounded border text-sm">
            <summary className="cursor-pointer font-semibold">Error Details</summary>
            <pre className="mt-2 text-xs overflow-auto whitespace-pre-wrap">{error.message}</pre>
            {error.stack && (
              <pre className="mt-2 text-xs overflow-auto whitespace-pre-wrap opacity-75 max-h-48">{error.stack}</pre>
            )}
          </details>
        )}
        <Button onClick={resetError} className="font-telegraf">
          Try Again
        </Button>
        <p className="mt-4 text-sm text-gray-500">
          If this persists, please check the browser console (F12) for more details.
        </p>
      </div>
    </div>
  );
};
