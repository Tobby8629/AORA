import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface spinner {
  size: "small" | "large",
  color: string
}

const ActivityIndictorSpinner = ({size, color}: spinner) => {
  return (
     <ActivityIndicator className=' animate-spin' size={size} color={color}/> 
  )
}

export default ActivityIndictorSpinner
