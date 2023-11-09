import { configureStore, createSlice } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { coinCapApi } from '../actions/actions'

const initialState = {
    coinsList: [],
    currentPage: 1,
    historyCoin:[],
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
const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    }
})
const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setCoinHistory: (state, action) => {
            state.historyCoin = action.payload;
        }
    }
})


export const { setCoinsList } = coinsSlice.actions;
export const { setCurrentPage } = paginationSlice.actions;
export const { setCoinHistory } = historySlice.actions;


export const store = configureStore({
    reducer: {
        [coinCapApi.reducerPath]: coinCapApi.reducer,
        coins: coinsSlice.reducer,
        pagination: paginationSlice.reducer,
        history: historySlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(coinCapApi.middleware),
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;