import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'
import { CHAIN_ID } from './networks'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
  {
    pid: 0,
    v1pid: 0,
    lpSymbol: 'SVC',
    lpAddresses: {
      97: process.env.NEXT_PUBLIC_SVC_ADDRESS,
      56: '',
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
      56: '',
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
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.wbnb,
  },
].filter((f) => !!f.lpAddresses[CHAIN_ID])

export default farms
