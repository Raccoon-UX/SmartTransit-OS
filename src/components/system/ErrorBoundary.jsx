import React from 'react';
import { Shield, RotateCcw, Home, PhoneCall } from 'lucide-react';

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
    console.error('SmartTransit OS — System Runtime Exception Captured:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-center p-6 text-left font-sans">
          <div className="max-w-xl w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded shadow-panel overflow-hidden">
            {/* Top 3px Institutional Accent Line */}
            <div className="h-1.5 bg-[#B91C1C] w-full" />

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded bg-[#B91C1C] flex items-center justify-center text-white shrink-0 font-bold">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-900 border border-rose-300 uppercase">
                    SERVICE TEMPORARILY UNAVAILABLE
                  </span>
                  <h1 className="text-xl font-extrabold text-slate-900 dark:text-white font-sans mt-1">
                    SmartTransit OS Diagnostic Notice
                  </h1>
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                The requested operational view encountered an unhandled exception. Platform safety isolation has been engaged to prevent disruption to background telemetry ingestion.
              </p>

              <div className="p-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-500 font-bold uppercase text-[10px]">Technical Diagnostic Log</div>
                <div className="text-rose-700 dark:text-rose-400 font-bold break-all">
                  {this.state.error?.toString() || 'Unknown Component Exception'}
                </div>
              </div>

              <div className="p-3 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono flex items-center space-x-3">
                <PhoneCall className="w-4 h-4 text-[#0B3D91] shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Technical Operations Support</span>
                  <strong className="text-slate-900 dark:text-white">1800-11-TRANSIT (Helpline Code: ERR-500-NOC)</strong>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={this.handleReset}
                  className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2 rounded bg-[#0B3D91] hover:bg-[#093278] text-white font-mono text-xs font-bold border border-[#07275f]"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reload Component State</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = '/';
                  }}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded bg-slate-200 hover:bg-slate-300 text-slate-900 font-mono text-xs font-bold border border-slate-300"
                >
                  <Home className="w-4 h-4" />
                  <span>Public Portal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
