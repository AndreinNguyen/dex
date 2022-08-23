import { createSelector } from '@reduxjs/toolkit'
import { AppState } from '../index'

const selectSelf = (state: AppState) => state

export const presaleInfo = createSelector(selectSelf, (state) => state.presale)
