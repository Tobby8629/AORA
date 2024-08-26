import { SafeAreaView,  StyleSheet, Text, View,} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <>
      <Stack screenOptions={{
        headerShown: false
      }}/>
      <StatusBar style='light'/>
    </>
    
  )
}

export default _layout
