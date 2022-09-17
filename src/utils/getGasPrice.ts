import { ChainId } from '@savvydex/sdk'
import store from 'state'
import { GAS_PRICE_GWEI } from 'state/types'

/**
 * Function to return gasPrice outwith a react component
 */
const getGasPrice = (chainId?: ChainId): string => {
  const state = store.getState()
  const userGas = state.user.gasPrice || GAS_PRICE_GWEI.default
  return chainId === ChainId.MAINNET ? userGas : GAS_PRICE_GWEI.testnet
}

export default getGasPrice
