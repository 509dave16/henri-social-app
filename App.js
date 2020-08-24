import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BreadProvider } from 'material-bread'

import { Navigation } from './src/components/root'

export default function App() {
  return (
    <SafeAreaProvider>
      <BreadProvider>
        <Navigation />
      </BreadProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  )
}
