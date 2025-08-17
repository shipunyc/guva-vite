# Guva Web3 Frontend

A modern web3 frontend built with Vite, React, TypeScript, and Coinbase CDP Wallets, featuring a seamless web2-like login experience and comprehensive smart contract integration.

## Features

- 🚀 **Vite** - Fast build tool and dev server
- ⚛️ **React 18** - Modern React with hooks
- 🔷 **TypeScript** - Type-safe development
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧭 **React Router** - Client-side routing
- 🔐 **Coinbase CDP Wallets** - Email-based authentication with magic link/OTP
- 💰 **Automatic Wallet Generation** - ETH wallet address provided by Coinbase
- 📖 **Smart Contract Reading** - Read operations from frontend using ethers.js
- ✍️ **Smart Contract Writing** - Write operations through Coinbase CDP
- 🔄 **React Query** - Efficient data fetching and caching

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navbar.tsx       # Navigation bar with user authentication
│   ├── LoginModal.tsx   # Email login modal with OTP verification
│   └── UserDropdown.tsx # User profile dropdown menu
├── hooks/               # Custom React hooks
│   ├── useCoinbaseAuth.ts # Coinbase CDP authentication logic
│   └── useSmartContracts.ts # Smart contract reading operations
├── services/            # Business logic services
│   └── coinbaseCDP.ts  # Coinbase CDP write operations
├── utils/               # Utility functions
│   └── contracts.ts    # Smart contract utilities and ABIs
├── pages/               # Page components
│   ├── Home.tsx         # Home page with NFT grid
│   ├── Gen.tsx          # Generation page (placeholder)
│   ├── Chat.tsx         # Chat page (placeholder)
│   └── Mining.tsx       # Mining page (placeholder)
├── App.tsx              # Main app component with routing
├── main.tsx             # Entry point with CDP providers
└── index.css            # Global styles with Tailwind
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Coinbase CDP project setup

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Coinbase CDP:
   - Create a project in [Coinbase CDP Portal](https://portal.cdp.coinbase.com/)
   - Get your `projectId` (UUID format)
   - Add `http://localhost:3000` to Domain Allowlist for development
   - Add your production domain to Domain Allowlist for production

4. Update the project ID in `src/main.tsx`:
   ```typescript
   <CDPHooksProvider projectId="your-project-id-here">
   ```

5. Configure smart contracts:
   - Update contract addresses in `src/hooks/useSmartContracts.ts`
   - Add your contract ABIs to `src/utils/contracts.ts`
   - Configure RPC endpoints in `src/utils/contracts.ts`

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Smart Contract Architecture

### **Read Operations (Frontend)**
Smart contract reading is handled directly from the frontend using **ethers.js**:

```typescript
import { useNFTs, useMarketplace, useTokens } from './hooks/useSmartContracts'

// Read NFT balance
const { balance, isLoading } = useNFTs()

// Read marketplace listings
const { listings } = useMarketplace()

// Read token balance
const { balance: tokenBalance } = useTokens()
```

**Features:**
- ✅ **Real-time data** - Live blockchain data
- ✅ **Efficient caching** - React Query for performance
- ✅ **Type safety** - Full TypeScript support
- ✅ **Network support** - Multiple Ethereum networks
- ✅ **Error handling** - Graceful fallbacks

### **Write Operations (Coinbase CDP)**
Smart contract writing is handled through **Coinbase CDP** for security:

```typescript
import { cdpTransactions } from './services/coinbaseCDP'

// Mint NFT through Coinbase CDP
const result = await cdpTransactions.mintNFT(
  nftAddress,
  userAddress,
  tokenURI
)

// Transfer tokens through Coinbase CDP
const result = await cdpTransactions.transferToken(
  tokenAddress,
  recipient,
  amount
)
```

**Benefits:**
- 🔒 **Secure** - No private keys in frontend
- 💰 **Gas sponsored** - Coinbase handles gas fees
- 🚀 **User-friendly** - No wallet setup required
- 📱 **Mobile ready** - Works on all devices

### **Supported Operations**

| Operation | Read (Frontend) | Write (CDP) |
|-----------|----------------|-------------|
| **Token Balance** | ✅ `useTokenBalance()` | ❌ |
| **Token Transfer** | ❌ | ✅ `transferToken()` |
| **NFT Metadata** | ✅ `useNFTMetadata()` | ❌ |
| **NFT Minting** | ❌ | ✅ `mintNFT()` |
| **Marketplace Listings** | ✅ `useMarketplaceListings()` | ❌ |
| **Create Listing** | ❌ | ✅ `createListing()` |
| **Purchase NFT** | ❌ | ✅ `purchaseListing()` |

## Coinbase CDP Integration

### Authentication Flow

1. **Email Input** - User enters their email address
2. **Verification** - Coinbase sends OTP code or magic link
3. **OTP Verification** - User enters 6-digit code (if OTP flow)
4. **Auto-login** - User is automatically authenticated
5. **Wallet Generation** - Coinbase provides ETH wallet address

### Features

- **No Server Required** - Pure frontend implementation
- **Web2-like Experience** - Email + verification code
- **Automatic Wallet** - No need to install MetaMask or other wallets
- **Secure Authentication** - Powered by Coinbase's infrastructure
- **Session Persistence** - Login state maintained across browser sessions

### Configuration

The app uses these Coinbase CDP packages:
- `@coinbase/cdp-hooks` - React hooks for authentication
- `@coinbase/cdp-core` - Core CDP functionality

## Development

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Add navigation link in `src/components/Navbar.tsx`

### Smart Contract Integration

1. **Add Contract Addresses** in `src/hooks/useSmartContracts.ts`
2. **Add Contract ABIs** in `src/utils/contracts.ts`
3. **Create Custom Hooks** for your contract functions
4. **Add Write Operations** in `src/services/coinbaseCDP.ts`

### Authentication

- **Login State**: Use `useCoinbaseAuth()` hook
- **User Info**: Access `user.email` and `user.address`
- **Logout**: Call `logout()` function from the hook

### Styling

The project uses Tailwind CSS with custom component classes defined in `src/index.css`.

## Troubleshooting

### Common Issues

1. **"projectId must be a valid UUID v4 format"**
   - Ensure your project ID from CDP Portal is a valid UUID
   - Format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

2. **Domain not allowed**
   - Add your domain to the Domain Allowlist in CDP Portal
   - For development: `http://localhost:3000`
   - For production: `https://yourdomain.com`

3. **Smart contract read errors**
   - Check RPC endpoint configuration
   - Verify contract addresses and ABIs
   - Ensure network configuration is correct

4. **OTP instead of magic link**
   - This is configurable in your CDP Portal settings
   - Both flows are supported by the app

## License

MIT