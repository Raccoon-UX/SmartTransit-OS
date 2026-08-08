import React from 'react';
import { AlertOctagon, RotateCcw, Home, ShieldCheck } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // In production, send exception telemetry to NOC observability endpoint
    console.error('SmartTransit OS — System Runtime Exception Captured:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 text-left">
          <div className="max-w-xl w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <AlertOctagon className="w-8 h-8" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-xs font-mono font-bold border border-rose-500/30">
                  SYSTEM EXCEPTION CAPTURED
                </span>
                <h1 className="text-xl font-bold font-sans text-white mt-1">SmartTransit OS Diagnostics</h1>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              A UI component execution error occurred. System state has been safely isolated to prevent cascading platform failure.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 font-mono text-xs space-y-1">
              <div className="text-slate-400 font-bold">Exception Message:</div>
              <div className="text-rose-400 break-all">{this.state.error?.toString() || 'Unknown Component Exception'}</div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={this.handleReset}
                className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-transit-500 hover:bg-transit-600 text-white font-mono text-xs font-bold transition-all shadow-glow"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload Application View</span>
              </button>
              <button
                onClick={() => {
                  window.location.href = '/';
                }}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-bold transition-all border border-slate-700"
              >
                <Home className="w-4 h-4" />
                <span>Public Landing</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-3">
              <span>SmartTransit OS v2.0 • SRE Diagnostics</span>
              <span>RBAC Protected</span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
