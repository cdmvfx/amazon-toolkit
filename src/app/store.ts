import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import settingsReducer from '../features/settings/settingsSlice'
import formsReducer from '../features/form/formsSlice'
import productsReducer from '../features/product/productsSlice'

export function makeStore() {
  return configureStore({
    reducer: { 
			settings: settingsReducer,
			forms: formsReducer,
			products: productsReducer
		},
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store