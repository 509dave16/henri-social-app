import * as React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

export default function LoadingIndicator({ style }) {
  const { colors } = useTheme()
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})