import { ChainId, Token } from '@savvydex/sdk'

const mapping = {
  [ChainId.MAINNET]: 'smartchain',
  [ChainId.ETHEREUM]: 'ethereum',
}

const getTokenLogoURL = (token?: Token) => {
  if (token && mapping[token.chainId]) {
    return `https://assets-cdn.trustwallet.com/blockchains/${mapping[token.chainId]}/assets/${token.address}/logo.png`
  }
  return null
}

export default getTokenLogoURL
