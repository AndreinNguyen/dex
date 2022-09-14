import { serializeTokens, mainnetTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens(mainnetTokens)

// TODO: support switch network

const farms: SerializedFarmConfig[] = [
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
      97: process.env.NEXT_PUBLIC_SVC_ADDRESS,
      56: process.env.NEXT_PUBLIC_SVC_ADDRESS,
    },
    token: serializedTokens.svc,
    quoteToken: serializedTokens.svc,
  },
  {
    pid: 1,
    v1pid: 251,
    lpSymbol: 'SVC-USDT LP',
    lpAddresses: {
      97: process.env.NEXT_PUBLIC_LP_SVC_BUSD,
      56: process.env.NEXT_PUBLIC_LP_SVC_BUSD,
    },
    token: serializedTokens.svc,
    quoteToken: serializedTokens.busd,
  },
  {
    pid: 2,
    v1pid: 252,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: process.env.NEXT_PUBLIC_LP_WBNB_BUSD,
      56: '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE',
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.wbnb,
  },
]

export default farms
