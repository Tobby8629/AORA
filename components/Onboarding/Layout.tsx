import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import Button from '../Button'
import { Link, useRouter } from 'expo-router'

interface layout {
 title: string
 btnText: string
 btnLink: () => void
 bottomText: string
 bottomLink: "/(auth)/signIn" | "/(auth)/signUp"
 btnLinkText: string
 children: React.ReactNode
 isloading: boolean
}

const Layout = ({title, btnText, btnLink, bottomLink, bottomText, btnLinkText, children, isloading}: layout) => {
  const route = useRouter()

  return (
    <SafeAreaView className='bg-pry_black min-h-full'>
      <ScrollView>
        <View className=' min-h-[80vh] justify-center w-full p-5'>
          <Image source={images.logo} className='w-[115px] h-[34px]' resizeMode='contain'/>
          <Text className='my-10 text-3xl text-white font-pregular'>{title}</Text>
           {children}
          <Button text={btnText} handlePress={btnLink} isloaded={isloading}/>
          <View>
            <Text className=' text-white text-center font-plight'>
              {bottomText}?{" "}
              <Link href={bottomLink} className='text-gold'>{btnLinkText}</Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Layout

const styles = StyleSheet.create({})