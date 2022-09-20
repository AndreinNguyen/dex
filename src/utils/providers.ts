import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { ChainId } from '@savvydex/sdk'

// export const BSC_PROD_NODE = process.env.NEXT_PUBLIC_NODE_PRODUCTION || 'https://bsc.nodereal.io'

const bscRpcProviders = {
  [ChainId.TESTNET]: new StaticJsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545'),
  [ChainId.MAINNET]: new StaticJsonRpcProvider('https://bsc.nodereal.io'),
  [ChainId.MUMBAI]: new StaticJsonRpcProvider('https://matic-mumbai.chainstacklabs.com'),
}

export const bscRpcProvider = (chainId?: ChainId) => bscRpcProviders[chainId]

export default null
