import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Make My Marriage ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0C10] text-gray-100 flex items-center justify-center p-6 font-sans">
          <div className="max-w-xl w-full p-8 rounded-2xl bg-[#15171E] border border-red-500/40 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-800 text-red-400 flex items-center justify-center font-bold text-lg">
                ⚠
              </span>
              <div>
                <h2 className="font-serif text-xl font-bold text-gray-100">Application Error</h2>
                <p className="text-xs text-gray-400">An unexpected runtime error occurred</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-red-900/40 text-red-300 font-mono text-xs overflow-x-auto">
              {this.state.error?.toString()}
            </div>

            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
