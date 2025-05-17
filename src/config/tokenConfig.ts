
// Token configuration for the MOONSET Token page
// This file can be modified to change the token displayed in the UI

export const tokenConfig = {
  // Default token (ETH)
  address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH address
  symbol: "ETH",
  name: "Ethereum",
  decimals: 18,
  
  // You can change this to any token you want
  // Example for changing to USDC:
  // address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  // symbol: "USDC",
  // name: "USD Coin",
  // decimals: 6,
  
  // API endpoints for price data
  // In a real implementation, you would use these to fetch actual data
  priceApi: "https://api.uniswap.org/v1/graphql", // Replace with actual endpoint
  
  // Links
  explorerUrl: "https://etherscan.io/token/",
  websiteUrl: "https://ethereum.org",
  twitterUrl: "https://twitter.com/ethereum",
};
