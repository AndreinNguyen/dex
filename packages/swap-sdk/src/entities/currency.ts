/* eslint-disable import/no-cycle */
import { NativeCurrency } from './nativeCurrency'
import { Token } from './token'

export type Currency = NativeCurrency | Token
