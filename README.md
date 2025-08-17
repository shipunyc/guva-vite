# Guva Web3 Frontend

A modern web3 frontend built with Vite, React, TypeScript, Wagmi, Viem, and Tailwind CSS.

## Features

- 🚀 **Vite** - Fast build tool and dev server
- ⚛️ **React 18** - Modern React with hooks
- 🔷 **TypeScript** - Type-safe development
- 🦊 **Wagmi** - React hooks for Ethereum
- 🔗 **Viem** - TypeScript interface for Ethereum
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧭 **React Router** - Client-side routing
- 💰 **Wallet Integration** - Connect MetaMask and other wallets

## Project Structure

```
src/
├── components/     # Reusable UI components
│   └── Navbar.tsx # Navigation bar with wallet connection
├── pages/         # Page components
│   ├── Home.tsx   # Home page with NFT grid
│   ├── Gen.tsx    # Generation page (placeholder)
│   ├── Chat.tsx   # Chat page (placeholder)
│   └── Mining.tsx # Mining page (placeholder)
├── App.tsx        # Main app component with routing
├── main.tsx       # Entry point with providers
└── index.css      # Global styles with Tailwind
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Configuration

### Wallet Connection

The app is configured to work with:
- MetaMask
- WalletConnect
- Injected wallets

Update the `projectId` in `src/main.tsx` for WalletConnect integration.

### Blockchain Networks

Currently configured for:
- Ethereum Mainnet
- Sepolia Testnet

## Development

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Add navigation link in `src/components/Navbar.tsx`

### Styling

The project uses Tailwind CSS with custom component classes defined in `src/index.css`.

## License

MIT