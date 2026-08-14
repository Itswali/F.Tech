import { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-4">
            <AlertTriangle className="size-8" />
          </div>
          <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            Something went wrong
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            An unexpected error occurred. Please try refreshing the page or navigating back home.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <RefreshCw className="size-4" /> Refresh Page
            </button>
            <a
              href="/"
              className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
            >
              Go to Homepage
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
