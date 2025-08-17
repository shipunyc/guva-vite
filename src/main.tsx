import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CDPHooksProvider } from '@coinbase/cdp-hooks'
import { initialize } from '@coinbase/cdp-core'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import './index.css'

// React Query client
const queryClient = new QueryClient()

// Initialize CDP Core
const projectId = '97676cf9-b0fb-4daa-9b34-4e9afd8993bb'

const initCDP = async () => {
  try {
    await initialize({
      projectId,
      useMock: false,
      debugging: true
    })
    console.log('🚀 CDP Core initialized successfully with Project ID:', projectId)
  } catch (error) {
    console.error('❌ Failed to initialize CDP Core:', error)
  }
}

// Initialize CDP before rendering
initCDP().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ErrorBoundary>
        <CDPHooksProvider config={{ projectId }}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </QueryClientProvider>
        </CDPHooksProvider>
      </ErrorBoundary>
    </React.StrictMode>,
  )
})