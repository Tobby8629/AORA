import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SolidRoundSpinner from './SolidSpinner'

interface inter {
   refreshing: boolean
   refreshh: () => void
}

const CustomRefresh = ({refreshing, refreshh}: inter) => {
  return (
    <TouchableOpacity onPress={refreshh} disabled={refreshing}>
      {refreshing ? 
       <SolidRoundSpinner className=' border-gold'/> : null
      }
    </TouchableOpacity>
  )
}

export default CustomRefresh

const styles = StyleSheet.create({})