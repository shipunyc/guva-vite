import { useState, useCallback } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ContractReader, contractUtils, NETWORKS } from '../utils/contracts'
import { useCoinbaseAuth } from './useCoinbaseAuth'

// Contract addresses (you'll need to add your actual contract addresses)
export const CONTRACT_ADDRESSES = {
  // Example addresses - replace with your actual contracts
  NFT_COLLECTION: '0x1234567890123456789012345678901234567890',
  NFT_MARKETPLACE: '0x0987654321098765432109876543210987654321',
  GUVA_TOKEN: '0x1111111111111111111111111111111111111111',
} as const

export const useSmartContracts = () => {
  const { user } = useCoinbaseAuth()
  const queryClient = useQueryClient()
  const [currentNetwork, setCurrentNetwork] = useState<typeof NETWORKS[keyof typeof NETWORKS]>(NETWORKS.SEPOLIA)

  // Get user's NFT balance
  const useNFTBalance = (contractAddress: string = CONTRACT_ADDRESSES.NFT_COLLECTION) => {
    return useQuery({
      queryKey: ['nft-balance', user?.address, contractAddress, currentNetwork.chainId],
      queryFn: async () => {
        if (!user?.address) return 0n

        const reader = new ContractReader(contractAddress, 'ERC721', currentNetwork.chainId)
        return await reader.getBalance(user.address)
      },
      enabled: !!user?.address,
      staleTime: 30000, // 30 seconds
    })
  }

  // Get NFT metadata
  const useNFTMetadata = (tokenId: bigint, contractAddress: string = CONTRACT_ADDRESSES.NFT_COLLECTION) => {
    return useQuery({
      queryKey: ['nft-metadata', contractAddress, tokenId, currentNetwork.chainId],
      queryFn: async () => {
        const reader = new ContractReader(contractAddress, 'ERC721', currentNetwork.chainId)
        return await reader.getNFTMetadata(tokenId)
      },
      staleTime: 60000, // 1 minute
    })
  }

  // Get marketplace listings
  const useMarketplaceListings = (contractAddress: string = CONTRACT_ADDRESSES.NFT_MARKETPLACE) => {
    return useQuery({
      queryKey: ['marketplace-listings', contractAddress, currentNetwork.chainId],
      queryFn: async () => {
        const reader = new ContractReader(contractAddress, 'NFTMarketplace', currentNetwork.chainId)
        return await reader.getMarketplaceListings()
      },
      staleTime: 15000, // 15 seconds
    })
  }

  // Get listing details
  const useListingDetails = (listingId: bigint, contractAddress: string = CONTRACT_ADDRESSES.NFT_MARKETPLACE) => {
    return useQuery({
      queryKey: ['listing-details', contractAddress, listingId, currentNetwork.chainId],
      queryFn: async () => {
        const reader = new ContractReader(contractAddress, 'NFTMarketplace', currentNetwork.chainId)
        return await reader.getListingDetails(listingId)
      },
      staleTime: 30000, // 30 seconds
    })
  }

  // Get token balance
  const useTokenBalance = (contractAddress: string = CONTRACT_ADDRESSES.GUVA_TOKEN) => {
    return useQuery({
      queryKey: ['token-balance', user?.address, contractAddress, currentNetwork.chainId],
      queryFn: async () => {
        if (!user?.address) return 0n

        const reader = new ContractReader(contractAddress, 'ERC20', currentNetwork.chainId)
        return await reader.getBalance(user.address)
      },
      enabled: !!user?.address,
      staleTime: 30000, // 30 seconds
    })
  }

  // Get token metadata
  const useTokenMetadata = (contractAddress: string = CONTRACT_ADDRESSES.GUVA_TOKEN) => {
    return useQuery({
      queryKey: ['token-metadata', contractAddress, currentNetwork.chainId],
      queryFn: async () => {
        const reader = new ContractReader(contractAddress, 'ERC20', currentNetwork.chainId)
        return await reader.getTokenMetadata()
      },
      staleTime: 300000, // 5 minutes
    })
  }

  // Refresh all contract data
  const refreshAllData = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['nft-balance'] })
    queryClient.invalidateQueries({ queryKey: ['marketplace-listings'] })
    queryClient.invalidateQueries({ queryKey: ['token-balance'] })
  }, [queryClient])

  // Change network
  const changeNetwork = useCallback((network: typeof NETWORKS[keyof typeof NETWORKS]) => {
    setCurrentNetwork(network)
    // Invalidate all queries when network changes
    queryClient.clear()
  }, [queryClient])

  return {
    // Hooks for reading contract data
    useNFTBalance,
    useNFTMetadata,
    useMarketplaceListings,
    useListingDetails,
    useTokenBalance,
    useTokenMetadata,

    // Utilities
    refreshAllData,
    changeNetwork,
    currentNetwork,

    // Contract utilities
    contractUtils,
    CONTRACT_ADDRESSES,
  }
}

// Convenience hooks for common use cases
export const useNFTs = () => {
  const { useNFTBalance, useNFTMetadata } = useSmartContracts()
  const balance = useNFTBalance()

  return {
    balance: balance.data || 0n,
    isLoading: balance.isLoading,
    error: balance.error,
    useNFTMetadata,
  }
}

export const useMarketplace = () => {
  const { useMarketplaceListings, useListingDetails } = useSmartContracts()
  const listings = useMarketplaceListings()

  return {
    listings: listings.data || [],
    isLoading: listings.isLoading,
    error: listings.error,
    useListingDetails,
  }
}

export const useTokens = () => {
  const { useTokenBalance, useTokenMetadata } = useSmartContracts()
  const balance = useTokenBalance()
  const metadata = useTokenMetadata()

  return {
    balance: balance.data || 0n,
    metadata: metadata.data,
    isLoading: balance.isLoading || metadata.isLoading,
    error: balance.error || metadata.error,
  }
}