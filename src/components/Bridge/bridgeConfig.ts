export enum ChainId {
  ETHEREUM = 1,
  RINKEBY = 4,
  GOERLI = 5,
  MAINNET = 56,
  TESTNET = 97,
  POLYGON = 137,
  MUMBAI = 80001,
}

export const networkSupportBridge = {
  [ChainId.TESTNET]: {
    chainId: ChainId.TESTNET,
    name: 'Binance Chain',
    address: '12345',
    logo: 'https://res.cloudinary.com/bridge-network/image/upload/v1649686608/logo/Binance_Smart_Chain.svg',
  },
  [ChainId.MUMBAI]: {
    chainId: ChainId.MUMBAI,
    name: 'Polygon Mumbai',
    address: '50560',
    logo: '	https://res.cloudinary.com/bridge-network/image/upload/v1646004158/logo/polygon.svg',
  },
}
