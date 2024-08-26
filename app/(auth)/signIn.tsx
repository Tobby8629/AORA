import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import Input from '@/components/Input'
import icons from '@/constants/icons'
import images from '@/constants/images'
import Button from '@/components/Button'
import { Link, useRouter } from 'expo-router'


const signIn = () => {
  const route = useRouter()
  const [showpassword, setshowpassword] = useState(false)
  const toggleshow = () => {
    setshowpassword(!showpassword)
  }  
  return (
    <SafeAreaView className='bg-pry_black h-full'>
      <ScrollView>
        <View className=' min-h-[85vh] justify-center w-full  p-5'>
          <Image source={images.logo} className='w-[115px] h-[34px]' resizeMode='contain'/>
          <Text className='my-10 text-3xl text-white font-pregular'>Sign In</Text>
          <Input placeholder='your unique username' title='username'/> 
          <Input placeholder='password'
            title= "password" 
            icon={showpassword ? icons.eye : icons.eyeHide} 
            iconStyle='w-[20px] h-[20px]'
            toggleshow={toggleshow}
            show = {showpassword}
          />
          <View className=' items-end'>
            <Text className='text-white font-plight font-normal'>Forget password</Text>
          </View>
          <Button text='sign up' handlePress={()=> route.replace("/(auth)/signUp")}/>
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

export default signIn