import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import { useRouter } from 'expo-router'
import images from '@/constants/images'
import SearchBar from '../SearchBar'


const Header = () => {
  return (
    <>
      <View className='flex-row justify-between items-center'>
        <View>
          <Text className='text-white font-pregular text-lg'>Welcome Back</Text>
          <Text className='text-white font-psemibold text-3xl font-semibold mt-2'>jsmastery</Text>
        </View>
        <View>
          <Image 
            source={images.logoSmall}
            resizeMode="contain"
            className='w-[30px] h-[34px]'
          />
        </View>
      </View>
      <SearchBar />
    </>
  )
}

export default Header
