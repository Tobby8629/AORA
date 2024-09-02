import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SolidRoundSpinner from './spinner/SolidSpinner'

interface button {
    text: string
    handlePress: () => void 
    isloaded?: any
}

const Button = ({ text, handlePress,isloaded }: button) => {
  return (
    <TouchableOpacity onPress={handlePress} className='bg-gold min-h-[58px] my-7 w-full text-gold rounded-lg justify-center items-center'>
      <Text className=' text-pry_black  text-lg font-semibold  capitalize font-pregular'>
        {isloaded ? <SolidRoundSpinner /> : text}  
      </Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({})