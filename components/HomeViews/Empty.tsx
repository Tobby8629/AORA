import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import icons from '@/constants/icons'
import Button from '../Button'
import { router } from 'expo-router'

const Empty = () => {
  return (
    <View className=' items-center'>
      <Image 
        source={images.empty}
        className='w-[270px] h-[216px]'
        resizeMode='contain'
      />
      <Text className=' font-pregular text-lg font-medium text-white'>No Videos Found</Text>
      <Text className=' font-pmedium text-white my text-2xl font-semibold my-2'> No Video Uploaded yet </Text>
      <Button 
        text= "Upload a Video"
        handlePress={()=> router.push("/(tabs)/Create")}
        className= "w-4/6"
        textStyle= 'font-pmedium text-xl'
      />
    </View>
  )
}

export default Empty

const styles = StyleSheet.create({})