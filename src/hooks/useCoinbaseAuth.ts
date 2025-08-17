import { useState, useEffect } from 'react'
import {
  useSignInWithEmail,
  useEvmAddress,
  useSignOut,
  useCurrentUser,
  useIsSignedIn,
  useVerifyEmailOTP
} from '@coinbase/cdp-hooks'

interface User {
  email: string
  address: string
  isConnected: boolean
}

export const useCoinbaseAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [showOTPInput, setShowOTPInput] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [currentFlowId, setCurrentFlowId] = useState('')
  const [loginSuccess, setLoginSuccess] = useState(false)

  // Real Coinbase CDP hooks
  const { signInWithEmail } = useSignInWithEmail()
  const { verifyEmailOTP } = useVerifyEmailOTP()
  const { evmAddress } = useEvmAddress()
  const { signOut } = useSignOut()
  const { currentUser } = useCurrentUser()
  const { isSignedIn } = useIsSignedIn()

  // Debug logging
  useEffect(() => {
    console.log('🔍 CDP Auth State Update:', {
      currentUser: currentUser ? {
        email: currentUser.authenticationMethods.email?.email,
        hasEmail: !!currentUser.authenticationMethods.email?.email
      } : null,
      evmAddress,
      isSignedIn,
      userState: user,
      loginSuccess
    })
  }, [currentUser, evmAddress, isSignedIn, user, loginSuccess])

  // Check if user is already logged in
  useEffect(() => {
    try {
      console.log('🔄 Processing auth state change...')

      if (currentUser && evmAddress) {
        console.log('✅ User authenticated with wallet:', { currentUser, evmAddress })
        const userData: User = {
          email: currentUser.authenticationMethods.email?.email || '',
          address: evmAddress,
          isConnected: true
        }
        setUser(userData)
        localStorage.setItem('guva_user', JSON.stringify(userData))
        setLoginSuccess(true)
        console.log('✅ User state updated with wallet:', userData)
      } else if (currentUser && !evmAddress) {
        console.log('⏳ User authenticated, waiting for wallet:', { currentUser, evmAddress })
        const userData: User = {
          email: currentUser.authenticationMethods.email?.email || '',
          address: 'Connecting wallet...',
          isConnected: true
        }
        setUser(userData)
        setLoginSuccess(true)
        console.log('✅ User state updated (no wallet yet):', userData)
      } else {
        console.log('❌ User not authenticated:', { currentUser, evmAddress })
        setUser(null)
        setLoginSuccess(false)
        localStorage.removeItem('guva_user')
      }
    } catch (err) {
      console.error('❌ Error in auth effect:', err)
      setError('Authentication error occurred')
    }
  }, [currentUser, evmAddress])

  const loginWithEmail = async (email: string) => {
    setIsLoading(true)
    setError(null)
    setMessage(null)
    setShowOTPInput(false)
    setLoginSuccess(false)

    try {
      console.log('📧 Attempting to sign in with email:', email)

      // Use real Coinbase CDP sign in
      const result = await signInWithEmail({ email })

      console.log('📧 Sign in result:', result)

      if (result.message) {
        // Check if we got an OTP code instead of magic link
        if (result.message.includes('code') || result.message.includes('OTP')) {
          // Show OTP input instead
          setShowOTPInput(true)
          setCurrentFlowId(result.flowId)
          setMessage(`We sent a verification code to ${email}. Please enter it below.`)
        } else {
          setMessage(`Magic link sent to ${email}! Check your email and click the link to complete sign in.`)
          console.log('📧 Sign in initiated with flow ID:', result.flowId)
        }
      } else {
        setError('Failed to send verification code. Please try again.')
      }
    } catch (err) {
      console.error('❌ Sign in error:', err)
      setError(`Failed to send verification code: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const verifyOTP = async () => {
    if (!otpCode.trim() || !currentFlowId) {
      setError('Please enter the verification code')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      console.log('🔐 Verifying OTP code:', otpCode, 'for flow:', currentFlowId)

      // Use real Coinbase CDP OTP verification
      const verifyResult = await verifyEmailOTP({
        flowId: currentFlowId,
        otp: otpCode
      })

      console.log('🔐 OTP verification result:', verifyResult)

      // Assume success if we get a result without throwing an error
      console.log('🎉 OTP verification successful!')
      setMessage('Code verified successfully! Setting up your account...')
      setShowOTPInput(false)
      setOtpCode('')
      setCurrentFlowId('')
      setLoginSuccess(true)

      // The CDP hooks should now update automatically
      // Give them a moment to sync
      setTimeout(() => {
        console.log('⏳ Waiting for CDP hooks to sync...')
        console.log('Current CDP state:', { currentUser, evmAddress, isSignedIn })
      }, 1000)

    } catch (err) {
      console.error('❌ OTP verification error:', err)
      setError('Failed to verify code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      console.log('🚪 Attempting to sign out')
      await signOut()

      // Clear all local state
      setUser(null)
      setError(null)
      setMessage(null)
      setShowOTPInput(false)
      setOtpCode('')
      setCurrentFlowId('')
      setLoginSuccess(false)

      // Clear localStorage
      localStorage.removeItem('guva_user')

      // Force a small delay to ensure CDP hooks sync
      setTimeout(() => {
        console.log('🔄 Post-logout state check:', {
          currentUser,
          evmAddress,
          isSignedIn,
          userState: user
        })
      }, 100)

      console.log('✅ Sign out successful')
    } catch (err) {
      console.error('❌ Sign out error:', err)
      setError(`Failed to sign out: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const connectWallet = async () => {
    if (!user) {
      setError('Please login first')
      return
    }

    try {
      // The wallet connection is handled automatically by Coinbase CDP
      // Just wait for the evmAddress to be available
      if (evmAddress) {
        setMessage('Wallet connected successfully!')
        setTimeout(() => setMessage(null), 3000)
      }
    } catch (err) {
      console.error('❌ Wallet connection error:', err)
      setError('Failed to connect wallet. Please try again.')
    }
  }

  const handleAuthCallback = async (token: string) => {
    try {
      // In real implementation, this would verify the magic link token
      // For now, the CDP hooks handle this automatically
      console.log('🔗 Auth callback received:', token)
    } catch (err) {
      console.error('❌ Auth callback error:', err)
      setError('Authentication failed. Please try again.')
    }
  }

  return {
    user,
    isLoading,
    error,
    message,
    setMessage,
    loginWithEmail,
    logout,
    connectWallet,
    handleAuthCallback,
    isConnected: user?.isConnected || false,
    cdpUser: currentUser,
    evmAddress,
    isSignedIn,
    showOTPInput,
    otpCode,
    setOtpCode,
    verifyOTP,
    loginSuccess
  }
}