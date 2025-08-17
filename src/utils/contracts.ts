import { ethers } from 'ethers'

// Ethereum network configurations
export const NETWORKS = {
  MAINNET: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/demo',
    explorer: 'https://etherscan.io'
  },
  SEPOLIA: {
    chainId: 11155111,
    name: 'Sepolia Testnet',
    rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/demo',
    explorer: 'https://sepolia.etherscan.io'
  },
  // Add more networks as needed
} as const

// Contract ABIs (you'll need to add your actual contract ABIs)
export const CONTRACT_ABIS = {
  // Example ERC-20 ABI for reading token balances
  ERC20: [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function decimals() view returns (uint8)',
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address) view returns (uint256)',
    'function allowance(address,address) view returns (uint256)'
  ],

  // Example ERC-721 ABI for reading NFT data
  ERC721: [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function tokenURI(uint256) view returns (string)',
    'function ownerOf(uint256) view returns (address)',
    'function balanceOf(address) view returns (uint256)',
    'function totalSupply() view returns (uint256)'
  ],

  // Example NFT Marketplace ABI
  NFTMarketplace: [
    'function getListing(uint256) view returns (address,uint256,bool)',
    'function getListings() view returns (uint256[])',
    'function getListingPrice(uint256) view returns (uint256)'
  ]
} as const

// Provider management
class ContractProvider {
  private providers: Map<number, ethers.JsonRpcProvider> = new Map()

  getProvider(chainId: number): ethers.JsonRpcProvider {
    if (!this.providers.has(chainId)) {
      const network = Object.values(NETWORKS).find(n => n.chainId === chainId)
      if (!network) {
        throw new Error(`Unsupported network: ${chainId}`)
      }

      const provider = new ethers.JsonRpcProvider(network.rpcUrl)
      this.providers.set(chainId, provider)
    }

    return this.providers.get(chainId)!
  }

  // Get provider for current network (default to Sepolia for development)
  getCurrentProvider(): ethers.JsonRpcProvider {
    return this.getProvider(NETWORKS.SEPOLIA.chainId)
  }
}

export const contractProvider = new ContractProvider()

// Contract reading utilities
export class ContractReader {
  private provider: ethers.JsonRpcProvider
  private contract: ethers.Contract

  constructor(
    contractAddress: string,
    abi: ethers.InterfaceAbi,
    chainId: number = NETWORKS.SEPOLIA.chainId
  ) {
    this.provider = contractProvider.getProvider(chainId)
    this.contract = new ethers.Contract(contractAddress, abi, this.provider)
  }

  // Generic read method
  async read<T>(method: string, ...args: any[]): Promise<T> {
    try {
      const result = await this.contract[method](...args)
      return result as T
    } catch (error) {
      console.error(`Error reading ${method}:`, error)
      throw new Error(`Failed to read ${method}: ${error}`)
    }
  }

  // Read token balance
  async getBalance(address: string): Promise<bigint> {
    return this.read<bigint>('balanceOf', address)
  }

  // Read token metadata
  async getTokenMetadata(): Promise<{ name: string; symbol: string; decimals: number }> {
    const [name, symbol, decimals] = await Promise.all([
      this.read<string>('name'),
      this.read<string>('symbol'),
      this.read<number>('decimals')
    ])

    return { name, symbol, decimals }
  }

  // Read NFT metadata
  async getNFTMetadata(tokenId: bigint): Promise<{ owner: string; tokenURI: string }> {
    const [owner, tokenURI] = await Promise.all([
      this.read<string>('ownerOf', tokenId),
      this.read<string>('tokenURI', tokenId)
    ])

    return { owner, tokenURI }
  }

  // Read marketplace listings
  async getMarketplaceListings(): Promise<bigint[]> {
    return this.read<bigint[]>('getListings')
  }

  // Read listing details
  async getListingDetails(listingId: bigint): Promise<{ seller: string; price: bigint; active: boolean }> {
    const [seller, price, active] = await this.read<[string, bigint, boolean]>('getListing', listingId)
    return { seller, price, active }
  }
}

// Utility functions for common operations
export const contractUtils = {
  // Format token amount with decimals
  formatTokenAmount(amount: bigint, decimals: number): string {
    return ethers.formatUnits(amount, decimals)
  },

  // Parse token amount to bigint
  parseTokenAmount(amount: string, decimals: number): bigint {
    return ethers.parseUnits(amount, decimals)
  },

  // Format ETH amount
  formatETH(amount: bigint): string {
    return ethers.formatEther(amount)
  },

  // Parse ETH amount
  parseETH(amount: string): bigint {
    return ethers.parseEther(amount)
  },

  // Validate Ethereum address
  isValidAddress(address: string): boolean {
    return ethers.isAddress(address)
  },

  // Get short address for display
  getShortAddress(address: string): string {
    if (!ethers.isAddress(address)) return 'Invalid Address'
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }
}

// Export types
export type Network = typeof NETWORKS[keyof typeof NETWORKS]
export type ContractABI = typeof CONTRACT_ABIS[keyof typeof CONTRACT_ABIS]