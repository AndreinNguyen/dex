import { Token } from '@savvydex/sdk'
import { mainnetTokens } from 'config/constants/tokens'

const { bondly, safemoon, itam, ccar, bttold } = mainnetTokens

interface WarningTokenList {
  [key: string]: Token
}

const SwapWarningTokens = <WarningTokenList>{
  safemoon,
  bondly,
  itam,
  ccar,
  bttold,
}

export default SwapWarningTokens
