'use client'

import { store, persistor } from '@/redux/store' // Adjust path as needed
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ReactNode } from 'react'

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}