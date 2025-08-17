import { ethers } from 'ethers'

// This service handles write operations through Coinbase CDP
// Read operations are handled by the ContractReader in utils/contracts.ts

export interface TransactionRequest {
  to: string
  data: string
  value?: bigint
  gasLimit?: bigint
}

export interface TransactionResult {
  hash: string
  status: 'pending' | 'confirmed' | 'failed'
  error?: string
}

export class CoinbaseCDPService {
  private static instance: CoinbaseCDPService

  private constructor() {}

  static getInstance(): CoinbaseCDPService {
    if (!CoinbaseCDPService.instance) {
      CoinbaseCDPService.instance = new CoinbaseCDPService()
    }
    return CoinbaseCDPService.instance
  }

  // Prepare transaction data for common operations
  prepareTransaction = {
    // ERC-20 token transfer
    transferToken: (tokenAddress: string, to: string, amount: bigint): TransactionRequest => {
      const iface = new ethers.Interface([
        'function transfer(address to, uint256 amount) returns (bool)'
      ])

      return {
        to: tokenAddress,
        data: iface.encodeFunctionData('transfer', [to, amount]),
        gasLimit: 100000n
      }
    },

    // ERC-20 token approval
    approveToken: (tokenAddress: string, spender: string, amount: bigint): TransactionRequest => {
      const iface = new ethers.Interface([
        'function approve(address spender, uint256 amount) returns (bool)'
      ])

      return {
        to: tokenAddress,
        data: iface.encodeFunctionData('approve', [spender, amount]),
        gasLimit: 100000n
      }
    },

    // NFT minting
    mintNFT: (nftAddress: string, to: string, tokenURI: string): TransactionRequest => {
      const iface = new ethers.Interface([
        'function mint(address to, string memory tokenURI) returns (uint256)'
      ])

      return {
        to: nftAddress,
        data: iface.encodeFunctionData('mint', [to, tokenURI]),
        gasLimit: 200000n
      }
    },

    // NFT transfer
    transferNFT: (nftAddress: string, from: string, to: string, tokenId: bigint): TransactionRequest => {
      const iface = new ethers.Interface([
        'function transferFrom(address from, address to, uint256 tokenId)'
      ])

      return {
        to: nftAddress,
        data: iface.encodeFunctionData('transferFrom', [from, to, tokenId]),
        gasLimit: 150000n
      }
    },

    // Marketplace listing
    createListing: (marketplaceAddress: string, nftAddress: string, tokenId: bigint, price: bigint): TransactionRequest => {
      const iface = new ethers.Interface([
        'function createListing(address nftContract, uint256 tokenId, uint256 price)'
      ])

      return {
        to: marketplaceAddress,
        data: iface.encodeFunctionData('createListing', [nftAddress, tokenId, price]),
        gasLimit: 200000n
      }
    },

    // Marketplace purchase
    purchaseListing: (marketplaceAddress: string, listingId: bigint, price: bigint): TransactionRequest => {
      const iface = new ethers.Interface([
        'function purchaseListing(uint256 listingId) payable'
      ])

      return {
        to: marketplaceAddress,
        data: iface.encodeFunctionData('purchaseListing', [listingId]),
        value: price,
        gasLimit: 250000n
      }
    },

    // Custom transaction
    custom: (to: string, data: string, value?: bigint, gasLimit?: bigint): TransactionRequest => {
      return {
        to,
        data,
        value,
        gasLimit: gasLimit || 100000n
      }
    }
  }

  // Submit transaction through Coinbase CDP
  // This would integrate with Coinbase CDP's transaction submission
  async submitTransaction(tx: TransactionRequest): Promise<TransactionResult> {
    try {
      console.log('🚀 Submitting transaction through Coinbase CDP:', tx)

      // TODO: Integrate with Coinbase CDP transaction submission
      // This is where you'd call the CDP API to submit the transaction

      // For now, return a mock result
      // In real implementation, you'd call something like:
      // const result = await cdpClient.submitTransaction({
      //   to: tx.to,
      //   data: tx.data,
      //   value: tx.value?.toString(),
      //   gasLimit: tx.gasLimit?.toString()
      // })

      return {
        hash: '0x' + Math.random().toString(16).substring(2, 66),
        status: 'pending'
      }
    } catch (error) {
      console.error('❌ Transaction submission failed:', error)
      throw new Error(`Transaction failed: ${error}`)
    }
  }

  // Batch multiple transactions
  async submitBatchTransactions(txs: TransactionRequest[]): Promise<TransactionResult[]> {
    const results: TransactionResult[] = []

    for (const tx of txs) {
      try {
        const result = await this.submitTransaction(tx)
        results.push(result)
      } catch (error) {
        results.push({
          hash: '',
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    return results
  }

  // Estimate gas for a transaction
  async estimateGas(tx: TransactionRequest): Promise<bigint> {
    try {
      console.log('⛽ Estimating gas for transaction:', tx)

      // TODO: Integrate with Coinbase CDP gas estimation
      // This would call the CDP API to estimate gas

      // For now, return the provided gas limit or a default
      return tx.gasLimit || 100000n
    } catch (error) {
      console.error('❌ Gas estimation failed:', error)
      // Return a safe default
      return 200000n
    }
  }

  // Get transaction status
  async getTransactionStatus(hash: string): Promise<TransactionResult['status']> {
    try {
      console.log('🔍 Checking transaction status:', hash)

      // TODO: Integrate with Coinbase CDP transaction status checking
      // This would call the CDP API to get transaction status

      // For now, return a mock status
      return 'confirmed'
    } catch (error) {
      console.error('❌ Status check failed:', error)
      return 'failed'
    }
  }
}

// Export singleton instance
export const coinbaseCDPService = CoinbaseCDPService.getInstance()

// Convenience functions for common operations
export const cdpTransactions = {
  // Token operations
  transferToken: async (tokenAddress: string, to: string, amount: bigint) => {
    const tx = coinbaseCDPService.prepareTransaction.transferToken(tokenAddress, to, amount)
    return await coinbaseCDPService.submitTransaction(tx)
  },

  approveToken: async (tokenAddress: string, spender: string, amount: bigint) => {
    const tx = coinbaseCDPService.prepareTransaction.approveToken(tokenAddress, spender, amount)
    return await coinbaseCDPService.submitTransaction(tx)
  },

  // NFT operations
  mintNFT: async (nftAddress: string, to: string, tokenURI: string) => {
    const tx = coinbaseCDPService.prepareTransaction.mintNFT(nftAddress, to, tokenURI)
    return await coinbaseCDPService.submitTransaction(tx)
  },

  transferNFT: async (nftAddress: string, from: string, to: string, tokenId: bigint) => {
    const tx = coinbaseCDPService.prepareTransaction.transferNFT(nftAddress, from, to, tokenId)
    return await coinbaseCDPService.submitTransaction(tx)
  },

  // Marketplace operations
  createListing: async (marketplaceAddress: string, nftAddress: string, tokenId: bigint, price: bigint) => {
    const tx = coinbaseCDPService.prepareTransaction.createListing(marketplaceAddress, nftAddress, tokenId, price)
    return await coinbaseCDPService.submitTransaction(tx)
  },

  purchaseListing: async (marketplaceAddress: string, listingId: bigint, price: bigint) => {
    const tx = coinbaseCDPService.prepareTransaction.purchaseListing(marketplaceAddress, listingId, price)
    return await coinbaseCDPService.submitTransaction(tx)
  }
}