import { useState, useEffect } from 'react'
import { useCoinbaseAuth } from '../hooks/useCoinbaseAuth'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState('')
  const {
    loginWithEmail,
    isLoading,
    error,
    message,
    showOTPInput,
    otpCode,
    setOtpCode,
    verifyOTP,
    loginSuccess,
    setMessage
  } = useCoinbaseAuth()

  // Auto-close modal when login is successful
  useEffect(() => {
    if (loginSuccess) {
      // Small delay to show success message before closing
      setTimeout(() => {
        handleClose()
      }, 1500)
    }
  }, [loginSuccess])

  // Clear message when modal opens
  useEffect(() => {
    if (isOpen) {
      // Clear any previous messages when modal opens
      setMessage(null)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      await loginWithEmail(email.trim())
      // Don't close modal immediately - let user see the success message or OTP input
    }
  }

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await verifyOTP()
  }

  const handleClose = () => {
    setEmail('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Guva</h2>
          <p className="text-lg text-gray-600">Sign in with your email to get started</p>
        </div>

        {!message && !showOTPInput ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </form>
        ) : showOTPInput ? (
          <form onSubmit={handleOTPSubmit} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                id="otp"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-lg tracking-widest"
                maxLength={6}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                We sent a 6-digit code to {email}
              </p>
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>

            <button
              type="button"
              onClick={() => {
                setOtpCode('')
                setEmail('')
              }}
              className="w-full btn-secondary"
            >
              Use Different Email
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="text-green-600 text-sm bg-green-50 p-4 rounded-md whitespace-pre-line">
              {message}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">
                {showOTPInput ? 'Enter the verification code from your email' : 'Check your email for the verification code'}
              </p>
              <button
                onClick={handleClose}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Powered by Coinbase CDP • Project ID: 97676cf9-b0fb-4daa-9b34-4e9afd8993bb
          </p>
        </div>

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default LoginModal