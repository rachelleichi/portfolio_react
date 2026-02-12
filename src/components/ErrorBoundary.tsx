import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-900 text-white p-8">
          <h1 className="text-4xl font-bold mb-4">❌ Erreur d'Application</h1>
          <p className="text-xl mb-4">Une erreur s'est produite:</p>
          <pre className="bg-red-800 p-4 rounded overflow-auto max-w-2xl text-sm">
            {this.state.error?.message}
            {'\n\n'}
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold"
          >
            Recharger la page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
