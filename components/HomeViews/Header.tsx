import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { useRouter } from 'expo-router'
import { Logout } from '@/lib/AppWrite'

const Header = () => {
  const route = useRouter()
  const signOut = ()  => {
    try{
      const log = Logout()
      route.replace('/(auth)/signIn')
    }
   catch(err:any) {
    Alert.alert(err.message)
   }

  }
  return (
    <>
      <View className='flex-row justify-between items-center'>
        <View>
          <Text className='text-white font-pregular text-lg'>Welcome Back</Text>
          <Text className='text-white font-psemibold text-3xl font-semibold mt-2'>jsmastery</Text>
        </View>
        <TouchableOpacity onPress={signOut}>
          <Image 
            source={images.logoSmall}
            resizeMode="contain"
            className='w-[30px] h-[34px]'
          />
        </TouchableOpacity>
        
      </View>
      <View className='h-[58px] my-5 items-center border-[1px] border-transparent flex-row justify-between bg-semi_black w-full rounded-md px-5'>
        <TextInput className='h-full text-whitish_gray text-xl w-11/12 font-pregular'
         placeholder='Search for a video topic'
         placeholderTextColor={"#CDCDE0"}
        />
        <TouchableOpacity onPress={()=> route.push("/")}>
          <Image source={icons.search}
            resizeMode='contain'
            className='w-[17px] h-[17px]' 
          />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Header

const styles = StyleSheet.create({})