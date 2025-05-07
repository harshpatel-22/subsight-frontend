import { configureStore, combineReducers } from '@reduxjs/toolkit'
import subscriptionReducer from './slices/subscriptionSlice'
import authReducer from './slices/authSlice'

const rootReducer = combineReducers({
	auth: authReducer,
	subscriptions: subscriptionReducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
