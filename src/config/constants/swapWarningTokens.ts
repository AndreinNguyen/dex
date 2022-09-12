import { Token } from '@savvydex/sdk'
// TODO: support switch network
import { mainnetTokens } from 'config/constants/tokens'
import rugPullTokens from 'config/constants/rugPullTokens'

const { bondly, safemoon, itam, ccar, bttold } = mainnetTokens
const { pokemoney } = rugPullTokens

interface WarningTokenList {
  [key: string]: Token
}

const SwapWarningTokens = <WarningTokenList>{
  safemoon,
  bondly,
  itam,
  ccar,
  bttold,
  pokemoney,
}

export default SwapWarningTokens
