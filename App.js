import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BreadProvider } from 'material-bread'
import { Provider } from 'react-redux'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

import { Navigation } from './src/components/root'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import AppReducer from './src/state/reducers'

const store = createStore(AppReducer, applyMiddleware(thunk))

export default function App() {
  return (
    <SafeAreaProvider>
      <BreadProvider>
        <ActionSheetProvider>
          <Provider store={store}>
            <Navigation />
          </Provider>
        </ActionSheetProvider>
      </BreadProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  )
}
