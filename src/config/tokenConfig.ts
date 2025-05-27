// Token configuration for the MOONSET Token page
// This file contains the configuration for the MOONSET ERC-20 token

export const tokenConfig = {
  // MOONSET Token Configuration
  // Note: Update the address when the token is deployed
  address: "0x0000000000000000000000000000000000000000", // Placeholder - update when deployed
  symbol: "MOONSET",
  name: "Moonset Token",
  decimals: 18,
  
  // Token Details
  description: "MOONSET is the native utility token of the Axis Mundi platform, designed to revolutionize how users interact with blockchain technology through innovative decentralized solutions.",
  
  // API endpoints for price data
  // These will be updated when the token goes live
  priceApi: "https://api.uniswap.org/v1/graphql", // Replace with actual endpoint when live
  
  // Links - update these when available
  explorerUrl: "https://etherscan.io/token/", // Will show full URL when token is deployed
  websiteUrl: "https://axismundi.io", // Update with your actual website
  twitterUrl: "https://twitter.com/axismundi", // Update with your actual Twitter
  discordUrl: "https://discord.gg/axismundi", // Community Discord
  telegramUrl: "https://t.me/axismundi", // Telegram channel
  githubUrl: "https://github.com/axismundi", // Project GitHub
  whitepaperUrl: "#", // Link to whitepaper when available
  
  // Launch Information
  isLaunched: false, // Set to true when token is live on Uniswap
  launchDate: null, // Set when launch date is confirmed
  prelaunchSignups: true, // Enable email signup for launch notifications
  
  // Trading Configuration
  uniswapUrl: "https://app.uniswap.org/#/swap?outputCurrency=", // Will append token address when deployed
  
  // Token Economics (update with actual values)
  totalSupply: "1000000000", // 1 billion tokens
  circulatingSupply: "400000000", // 400 million initially circulating
  maxSupply: "1000000000", // Maximum supply (same as total for non-mintable token)
  
  // Token Distribution
  distribution: {
    publicSale: 40, // 40%
    team: 20, // 20% - locked for 2 years
    advisors: 5, // 5% - locked for 1 year
    ecosystem: 25, // 25% - for platform development
    liquidity: 10, // 10% - for DEX liquidity
  },
  
  // Roadmap & Features
  roadmap: [
    {
      phase: "Phase 1",
      title: "Token Launch",
      status: "upcoming",
      items: [
        "Deploy MOONSET token contract",
        "List on Uniswap V3",
        "Initialize liquidity pools",
        "Launch trading interface"
      ]
    },
    {
      phase: "Phase 2", 
      title: "Staking & Governance",
      status: "planned",
      items: [
        "Deploy staking contracts",
        "Launch governance portal",
        "Community proposal system",
        "Voting mechanisms"
      ]
    },
    {
      phase: "Phase 3",
      title: "Platform Integration",
      status: "planned", 
      items: [
        "Premium feature access",
        "Advanced trading tools",
        "Cross-chain bridge",
        "Mobile app integration"
      ]
    }
  ],
  
  // Security & Compliance
  security: {
    audited: false, // Set to true when audit is complete
    auditFirm: "TBD", // Name of audit firm
    auditReport: "#", // Link to audit report
    bugBounty: false, // Bug bounty program
    multisig: true, // Multi-signature wallet for admin functions
  },
  
  // Marketing copy
  tagline: "Your gateway to the future of decentralized technology",
  
  // Features for display
  features: [
    "First access to MOONSET ecosystem",
    "Governance voting rights on platform decisions", 
    "Staking rewards and passive income generation",
    "Premium platform features and tools access",
    "Reduced trading fees across all services",
    "Exclusive access to new product launches"
  ],
  
  // Utility Functions
  utilities: [
    {
      title: "Governance Participation",
      description: "Vote on platform improvements, feature requests, and treasury allocation",
      icon: "Users"
    },
    {
      title: "Staking Rewards", 
      description: "Earn passive income by staking MOONSET tokens with competitive APY",
      icon: "Lock"
    },
    {
      title: "Premium Features",
      description: "Access advanced trading tools, analytics, and priority customer support",
      icon: "Star"
    },
    {
      title: "Fee Discounts",
      description: "Reduce trading fees by up to 50% when paying with MOONSET tokens",
      icon: "Zap"
    }
  ],
  
  // Social proof & partnerships
  backers: [
    // Add when partnerships are established
  ],
  
  // Team information
  team: {
    public: false, // Set to true when team info should be displayed
    members: [
      // Add team members when ready to make public
    ]
  }
};
