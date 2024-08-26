import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

interface input {
  placeholder: string,
  title: string,
  icon?: any,
  show?:boolean
  iconStyle?: string
  toggleshow?: () => void
  keyboard_type?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url' | 'number-pad' | 'decimal-pad' | 'web-search' | 'ascii-capable' | 'numbers-and-punctuation' | 'name-phone-pad' | 'visible-password';
}


const Input = ({title, placeholder,keyboard_type, icon, iconStyle, toggleshow, show}: input) => {
  const [isFocus, setisFocus] = useState(false)
  console.log(show)
  return (
    <View className='w-full mb-5'>
      <Text className='text-xl text-white mb-2 capitalize font-pregular'>{title}</Text>
      <View className='h-[58px] items-center border-[1px] flex-row  bg-semi_black w-full rounded-md px-3' 
        style={{
          borderColor: isFocus ? '#FFA300' : 'transparent',
        }}
      >
        <TextInput
        placeholder={placeholder}
        keyboardType={keyboard_type || "default"}
        secureTextEntry = { show || false } 
        onFocus={()=> setisFocus(true)}
        onBlur={()=> setisFocus(false)}
        className='h-full w-11/12 border-none text-white font-pregular transition-all' 
        />
        {icon &&
          <TouchableOpacity onPress={toggleshow} className='w-1/12'> 
            <Image source={icon} resizeMode="contain" className={` ${iconStyle}`}  />
          </TouchableOpacity>
          
        }
      </View>
    </View>
  )
}

export default Input
