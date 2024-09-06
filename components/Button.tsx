import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SolidRoundSpinner from './spinner/SolidSpinner'

interface button {
    text: string
    handlePress: () => void 
    isloaded?: any
    className?: string
    textStyle?: string

}

const Button = ({ text, handlePress,isloaded, className, textStyle}: button) => {
  return (
    <TouchableOpacity onPress={handlePress} className={`bg-gold min-h-[58px] my-7 w-full text-gold rounded-lg justify-center items-center ${className}`}>
      <Text className={`text-pry_black text-lg font-semibold  capitalize font-pregular ${textStyle}`}>
        {isloaded ? <SolidRoundSpinner /> : text}  
      </Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({})