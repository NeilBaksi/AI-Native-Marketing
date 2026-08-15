import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

/**
 * Catches render errors below it so a bad MDX reference or component crash
 * degrades to a visible message instead of a silent blank page — the exact
 * failure mode a missing MDX provider caused before it was caught.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Page render error:', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex items-start gap-3 rounded-2xl rounded-bl-none rounded-tr-none border border-rule bg-surface p-6">
          <AlertTriangle size={20} className="mt-0.5 shrink-0 text-ember-deep" aria-hidden />
          <div>
            <p className="font-medium text-ink">This page failed to render.</p>
            <p className="mt-1 text-sm text-muted">{this.state.error.message}</p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
