/* eslint-disable no-return-assign */
/* eslint-disable import/no-cycle */
import invariant from 'tiny-invariant'
import { Currency } from './currency'
import { NativeCurrency } from './nativeCurrency'
import { Token } from './token'
import { WNATIVE, NATIVE } from '../constants'

/**
 *
 * Native is the main usage of a 'native' currency, i.e. for BSC mainnet and all testnets
 */
export class Native extends NativeCurrency {
  protected constructor({
    chainId,
    decimals,
    name,
    symbol,
  }: {
    chainId: number
    decimals: number
    symbol: string
    name: string
  }) {
    super(chainId, decimals, symbol, name)
  }

  public get wrapped(): Token {
    const wnative = WNATIVE[this.chainId]
    invariant(!!wnative, 'WRAPPED')
    return wnative
  }

  private static cache: { [chainId: number]: Native } = {}

  public static onChain(chainId: number): Native {
    if (chainId in this.cache) {
      return this.cache[chainId]
    }
    invariant(!!NATIVE[chainId], 'NATIVE_CURRENCY')
    const { decimals, name, symbol } = NATIVE[chainId]
    return (this.cache[chainId] = new Native({ chainId, decimals, symbol, name }))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
