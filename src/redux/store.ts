import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // For localStorage
import subscriptionReducer from './subscriptionSlice'
import authReducer from './authSlice'

// Configure which parts of the state to persist
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth'], // Only persist auth state - modify as needed
	// You can also blacklist specific reducers: blacklist: ['subscriptions']
}

// Combine all reducers
const rootReducer = combineReducers({
	auth: authReducer,
	subscriptions: subscriptionReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore redux-persist actions
				ignoredActions: [
					'persist/PERSIST',
					'persist/REHYDRATE',
					'persist/REGISTER',
				],
			},
		}),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
