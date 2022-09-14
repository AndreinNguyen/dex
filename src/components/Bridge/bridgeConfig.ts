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
    name: 'BSC Testnet',
  },
  [ChainId.MUMBAI]: {
    name: 'Mumbai',
  },
}
