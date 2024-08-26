import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface button {
    text: string
    handlePress: () => void 
}

const Button = ({ text, handlePress, }: button) => {
  return (
    <TouchableOpacity onPress={handlePress} className='bg-gold min-h-[58px] my-7 w-full text-gold rounded-lg justify-center items-center'>
      <Text className=' text-pry_black text-lg font-semibold  capitalize font-pregular'>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({})