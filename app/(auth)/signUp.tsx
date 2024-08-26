import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { Link, useRouter } from 'expo-router'
import icons from '@/constants/icons'

const signUp = () => {
  const route = useRouter()
  return (
    <SafeAreaView className='bg-pry_black h-full'>
    <ScrollView>
      <View className=' min-h-[85vh] justify-center w-full  p-5'>
        <Image source={images.logo} className='w-[115px] h-[34px]' resizeMode='contain'/>
        <Text className='my-10 text-3xl text-white font-pregular'>Sign up</Text>
        <Input placeholder='your unique username' title='username'/> 
        <Input placeholder='Enter your email' title='email'  keyboard_type="email-address" />
        <Input placeholder='password' title='passord' icon={icons.eye} iconStyle='w-[20px] h-[20px]' />
        <Button text='sign up' handlePress={()=> route.replace("/(auth)/signIn")}/>
          <View>
            <Text className=' text-white text-center font-plight'>
              Don’t have an account?{" "}
              <Link href="/(auth)/signUp" className='text-gold'>Signup</Link>
            </Text>
          </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default signUp

const styles = StyleSheet.create({})