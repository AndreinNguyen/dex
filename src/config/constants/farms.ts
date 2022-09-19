import { ChainId } from '@savvydex/sdk'
import { serializeTokens, mainnetTokens, SVC, LP_SVC_BUSD, LP_WBNB_BUSD, testnetTokens, mumbaiTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = {
  [ChainId.TESTNET]: serializeTokens(testnetTokens),
  [ChainId.MAINNET]: serializeTokens(mainnetTokens),
  [ChainId.MUMBAI]: serializeTokens(mumbaiTokens),
}

// TODO: support switch network

const farms = (chainId: ChainId): SerializedFarmConfig[] => [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
  {
    pid: 0,
    // TODO:
    // v1pid: 0,
    v1pid: 1,
    lpSymbol: 'SVC',
    lpAddresses: {
      97: SVC[ChainId.TESTNET].address,
      56: SVC[ChainId.MAINNET].address,
      80001: SVC[ChainId.MUMBAI].address,
    },
    token: serializedTokens[chainId].svc,
    quoteToken: serializedTokens[chainId].svc,
  },
  {
    pid: 1,
    v1pid: 251,
    lpSymbol: 'SVC-USDT LP',
    lpAddresses: {
      97: LP_SVC_BUSD[ChainId.TESTNET],
      56: LP_SVC_BUSD[ChainId.MAINNET],
      80001: LP_SVC_BUSD[ChainId.MUMBAI],
    },
    token: serializedTokens[chainId].svc,
    quoteToken: serializedTokens[chainId].busd,
  },
  {
    pid: 2,
    v1pid: 252,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: LP_WBNB_BUSD[ChainId.TESTNET],
      56: LP_WBNB_BUSD[ChainId.MAINNET],
      80001: LP_WBNB_BUSD[ChainId.MUMBAI],
    },
    token: serializedTokens[chainId].busd,
    quoteToken: serializedTokens[chainId].wbnb,
  },
]

export default farms
