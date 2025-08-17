import { useState } from 'react'

interface Miner {
  id: number
  location: string
  country: string
  gpu: string
  memory: string
  status: 'busy' | 'idle'
  usage: number
  earning: number
  uptime: string
}

const Mining = () => {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'busy' | 'idle'>('all')

  // Mock miner data
  const miners: Miner[] = [
    {
      id: 1,
      location: 'New York',
      country: 'US',
      gpu: 'RTX 5090',
      memory: '24 GB GDDR7',
      status: 'busy',
      usage: 87,
      earning: 12.5,
      uptime: '3d 14h 22m'
    },
    {
      id: 2,
      location: 'Berlin',
      country: 'DE',
      gpu: 'RTX 4090',
      memory: '24 GB GDDR6X',
      status: 'idle',
      usage: 12,
      earning: 8.2,
      uptime: '1d 8h 45m'
    },
    {
      id: 3,
      location: 'Paris',
      country: 'FR',
      gpu: 'RTX 5090',
      memory: '24 GB GDDR7',
      status: 'busy',
      usage: 94,
      earning: 15.8,
      uptime: '5d 2h 11m'
    },
    {
      id: 4,
      location: 'Shanghai',
      country: 'CN',
      gpu: 'RTX 4090',
      memory: '24 GB GDDR6X',
      status: 'busy',
      usage: 76,
      earning: 11.3,
      uptime: '2d 19h 33m'
    },
    {
      id: 5,
      location: 'Tokyo',
      country: 'JP',
      gpu: 'RTX 5090',
      memory: '24 GB GDDR7',
      status: 'idle',
      usage: 8,
      earning: 6.7,
      uptime: '4d 6h 58m'
    },
    {
      id: 6,
      location: 'Sydney',
      country: 'AU',
      gpu: 'RTX 4090',
      memory: '24 GB GDDR6X',
      status: 'busy',
      usage: 91,
      earning: 13.1,
      uptime: '1d 15h 42m'
    },
    {
      id: 7,
      location: 'Toronto',
      country: 'CA',
      gpu: 'RTX 5090',
      memory: '24 GB GDDR7',
      status: 'idle',
      usage: 15,
      earning: 9.4,
      uptime: '3d 9h 27m'
    },
    {
      id: 8,
      location: 'London',
      country: 'GB',
      gpu: 'RTX 4090',
      memory: '24 GB GDDR6X',
      status: 'busy',
      usage: 83,
      earning: 14.2,
      uptime: '2d 12h 8m'
    }
  ]

  const filteredMiners = selectedStatus === 'all'
    ? miners
    : miners.filter(miner => miner.status === selectedStatus)

  const totalEarnings = miners.reduce((sum, miner) => sum + miner.earning, 0)
  const busyMiners = miners.filter(miner => miner.status === 'busy').length
  const idleMiners = miners.filter(miner => miner.status === 'idle').length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mining Network</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Monitor your global mining infrastructure. Track GPU performance, usage, and earnings across all locations.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">{miners.length}</div>
            <div className="text-sm text-gray-600">Total Miners</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">{busyMiners}</div>
            <div className="text-sm text-gray-600">Active Miners</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-2">{idleMiners}</div>
            <div className="text-sm text-gray-600">Idle Miners</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-primary-600 mb-2">⚡️ {totalEarnings.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Total Earnings</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <span className="text-sm font-medium text-gray-700">Filter by Status:</span>
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedStatus === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All ({miners.length})
            </button>
            <button
              onClick={() => setSelectedStatus('busy')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedStatus === 'busy'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Busy ({busyMiners})
            </button>
            <button
              onClick={() => setSelectedStatus('idle')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedStatus === 'idle'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Idle ({idleMiners})
            </button>
          </div>
        </div>

        {/* Miners List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Miner Details</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GPU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Earnings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uptime
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMiners.map((miner) => (
                  <tr key={miner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">{miner.country}</span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{miner.location}</div>
                          <div className="text-sm text-gray-500">{miner.country}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{miner.gpu}</div>
                      <div className="text-sm text-gray-500">{miner.memory}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        miner.status === 'busy'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {miner.status === 'busy' ? '🟢 Busy' : '🟡 Idle'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              miner.usage > 80 ? 'bg-red-500' :
                              miner.usage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${miner.usage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{miner.usage}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-primary-600">
                        ⚡️ {miner.earning.toFixed(1)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {miner.uptime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mining