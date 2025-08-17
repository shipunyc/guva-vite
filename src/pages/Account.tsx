import { useState } from 'react'

interface Transaction {
  id: string
  type: 'earning' | 'spending'
  amount: number
  description: string
  timestamp: string
  status: 'completed' | 'pending' | 'failed'
}

const Account = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview')

  // Mock data - in real app this would come from your backend/CDP
  const balance = 47.8
  const totalEarned = 156.3
  const totalSpent = 108.5

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'earning',
      amount: 12.5,
      description: 'LoRA usage reward - Nishikigi Chisato',
      timestamp: '2024-01-15 14:30',
      status: 'completed'
    },
    {
      id: '2',
      type: 'spending',
      amount: -8.2,
      description: 'Image generation - Text2Image Cartoon',
      timestamp: '2024-01-15 13:15',
      status: 'completed'
    },
    {
      id: '3',
      type: 'earning',
      amount: 15.8,
      description: 'LoRA usage reward - Illustrious Gehenna',
      timestamp: '2024-01-14 16:45',
      status: 'completed'
    },
    {
      id: '4',
      type: 'spending',
      amount: -12.1,
      description: 'Video generation - Text2Video Cartoon',
      timestamp: '2024-01-14 11:20',
      status: 'completed'
    },
    {
      id: '5',
      type: 'earning',
      amount: 9.4,
      description: 'Mining reward - GPU computation',
      timestamp: '2024-01-13 09:30',
      status: 'completed'
    },
    {
      id: '6',
      type: 'spending',
      amount: -6.7,
      description: 'Image generation - Image2Image Cartoon',
      timestamp: '2024-01-13 15:10',
      status: 'completed'
    }
  ]

  const handleTopUp = () => {
    // TODO: Implement top-up functionality
    alert('Top-up functionality coming soon!')
  }

  const handleWithdraw = () => {
    // TODO: Implement withdrawal functionality
    alert('Withdrawal functionality coming soon!')
  }

  const formatAmount = (amount: number) => {
    return amount >= 0 ? `+${amount.toFixed(1)}` : `${amount.toFixed(1)}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    return type === 'earning' ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Account</h1>
          <p className="text-lg text-gray-600">
            Manage your ⚡️ balance, track earnings, and control your finances
          </p>
        </div>

        {/* Account Overview Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Current Balance */}
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">⚡️ {balance.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Current Balance</div>
            </div>

            {/* Total Earned */}
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">⚡️ {totalEarned.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Total Earned</div>
            </div>

            {/* Total Spent */}
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">⚡️ {totalSpent.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={handleTopUp}
              className="btn-primary px-8 py-3 text-lg flex items-center justify-center space-x-2"
            >
              <span>💳</span>
              <span>Top Up with PyUSD/USDC</span>
            </button>

            <button
              onClick={handleWithdraw}
              className="btn-secondary px-8 py-3 text-lg flex items-center justify-center space-x-2"
            >
              <span>💰</span>
              <span>Withdraw to PyUSD/USDC</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'overview'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'history'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Transaction History
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' ? (
              /* Overview Tab */
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {transactions.slice(0, 3).map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-3 bg-white rounded-md">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900">{tx.description}</div>
                            <div className="text-xs text-gray-500">{tx.timestamp}</div>
                          </div>
                          <div className={`text-sm font-semibold ${getTypeColor(tx.type)}`}>
                            {formatAmount(tx.amount)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">This Month Earned</span>
                        <span className="text-sm font-semibold text-green-600">⚡️ 89.2</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">This Month Spent</span>
                        <span className="text-sm font-semibold text-red-600">⚡️ 67.8</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Net Profit</span>
                        <span className="text-sm font-semibold text-primary-600">⚡️ 21.4</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Active LoRAs</span>
                        <span className="text-sm font-semibold text-blue-600">3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* History Tab */
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
                  <div className="text-sm text-gray-500">
                    Showing {transactions.length} transactions
                  </div>
                </div>

                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          tx.type === 'earning' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{tx.description}</div>
                          <div className="text-xs text-gray-500">{tx.timestamp}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className={`text-sm font-semibold ${getTypeColor(tx.type)}`}>
                          {formatAmount(tx.amount)}
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(tx.status)}`}>
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account