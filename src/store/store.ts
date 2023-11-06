import { configureStore,createSlice } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { coinCapApi } from '../actions/actions'

const initialState = {
    coinsList:[]
}
const coinsSlice = createSlice({
    name: 'coins',
    initialState,
    reducers: {
        setCoinsList: (state, action) => {
            state.coinsList = action.payload;
        }
    }
})

export const {setCoinsList} = coinsSlice.actions;

export const store = configureStore({
  reducer: {
    [coinCapApi.reducerPath]:coinCapApi.reducer,
    coins: coinsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(coinCapApi.middleware), 
})

setupListeners(store.dispatch) 
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;