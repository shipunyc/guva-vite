import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCoinbaseAuth } from '../hooks/useCoinbaseAuth'
import LoginModal from './LoginModal'
import UserDropdown from './UserDropdown'

const Navbar = () => {
  const location = useLocation()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { user, isConnected } = useCoinbaseAuth()

  // Debug logging
  useEffect(() => {
    console.log('🔍 Navbar Auth State:', {
      user,
      isConnected,
      hasUser: !!user,
      userEmail: user?.email,
      userAddress: user?.address
    })
  }, [user, isConnected])

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/gen', label: 'Gen' },
    { path: '/mining', label: 'Mining' },
  ]

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/assets/images/logo.png"
                alt="Guva Logo"
                className="h-8 w-8 mr-3"
              />
              <span className="text-xl font-bold text-gray-900">Guva</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* User Account Section */}
            <div className="flex items-center space-x-4">
              {isConnected && user ? (
                <UserDropdown />
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="btn-primary"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}

export default Navbar