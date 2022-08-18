import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { PresaleState } from 'state/types'
import fetchUserPresaleInfo from './fetchUserPresaleInfo'

const initialState: PresaleState = {
  isInWhiteList: false,
  totalAmount: '0',
  lockedAmount: '0',
  pendingAmount: '0',
  receivedAmount: '0',
  isLoading: false,
}

export const fetchPresaleDataAsync = createAsyncThunk<PresaleState, string>(
  'presale/fetchPresaleDataAsync',
  async (acount: string) => {
    const res = await fetchUserPresaleInfo(acount)
    return res
  },
)

export const presaleSlice = createSlice({
  name: 'Presale',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPresaleDataAsync.fulfilled, (state, action) => {
        state.isInWhiteList = true
        state.totalAmount = action.payload.totalAmount
        state.lockedAmount = action.payload.lockedAmount
        state.pendingAmount = action.payload.pendingAmount
        state.receivedAmount = action.payload.receivedAmount
        state.isLoading = false
      })
      .addCase(fetchPresaleDataAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchPresaleDataAsync.rejected, (state) => {
        state.isInWhiteList = false
        state.isLoading = false
        state.totalAmount = '0'
        state.lockedAmount = '0'
        state.pendingAmount = '0'
        state.receivedAmount = '0'
      })
  },
})

export default presaleSlice.reducer
