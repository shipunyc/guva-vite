import { useState, useEffect } from 'react'
import { useCoinbaseAuth } from '../hooks/useCoinbaseAuth'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState('')
  const {
    isLoading,
    error,
    message,
    showOTPInput,
    otpCode,
    loginSuccess,
    loginWithEmail,
    verifyOTP,
    setOtpCode,
    setMessage,
    clearError
  } = useCoinbaseAuth()

  // Auto-close modal on successful login
  useEffect(() => {
    if (loginSuccess) {
      const timer = setTimeout(() => {
        onClose()
        setEmail('')
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [loginSuccess, onClose])

  // Clear message when modal opens
  useEffect(() => {
    if (isOpen) {
      setMessage(null)
      clearError()
    }
  }, [isOpen, setMessage, clearError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    await loginWithEmail(email.trim())
  }

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otpCode.trim()) return

    await verifyOTP(otpCode.trim())
  }

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setOtpCode(value)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {showOTPInput ? 'Enter Verification Code' : 'Sign In to Guva'}
          </h2>
          <p className="text-gray-600">
            {showOTPInput
              ? 'Enter the 6-digit code sent to your email'
              : 'Enter your email to get started with AI-powered LoRA marketplace'
            }
          </p>
        </div>

        {!showOTPInput ? (
          /* Email Input Form */
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !email.trim()}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending verification...</span>
                </div>
              ) : (
                'Continue with Email'
              )}
            </button>
          </form>
        ) : (
          /* OTP Input Form */
          <form onSubmit={handleOTPSubmit}>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                id="otp"
                value={otpCode}
                onChange={handleOTPChange}
                placeholder="000000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-2xl tracking-widest"
                maxLength={6}
                pattern="[0-9]{6}"
                required
                disabled={isLoading}
                autoComplete="one-time-code"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the 6-digit code from your email
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading || otpCode.length !== 6}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                'Verify Code'
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setOtpCode('')
                setMessage(null)
                clearError()
              }}
              className="w-full mt-2 text-sm text-gray-600 hover:text-gray-800 underline"
              disabled={isLoading}
            >
              Use a different email
            </button>
          </form>
        )}

        {/* Status Messages */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {message && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-600">{message}</p>
          </div>
        )}

        {loginSuccess && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-green-600">Login successful! Setting up your account...</p>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          disabled={isLoading}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            Powered by Coinbase CDP • Client API Key: hEv5hIaFKvwHBdfxolSS2vzk89Fk56GG
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginModal