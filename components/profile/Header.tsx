import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons'
import { Logout } from '@/lib/AppWrite'
import { useGlobalContext } from '@/context/GlobalProvider'
import { router } from 'expo-router'


interface profile {
  post: any 
  useravatar: string
  username: string
}


const Header = ({post, useravatar, username}: profile) => {
  const { user, setuser, setislogged} = useGlobalContext()
  const logout = async () => {
    try{
      Logout().then(()=>{
        setuser("")
        setislogged(false)
        router.replace("/(auth)/signIn")
      })
    }
    catch(err: any){
      console.log(err.message)
    }
  }
  return (
    <View>
      <TouchableOpacity  className=' flex-row justify-end' onPress={logout}>
        <Image source={icons.logout} className=' w-6 h-6' resizeMode='contain' />
      </TouchableOpacity>
      <View className=' items-center my-3'>
        <Image 
          source={{uri: useravatar}}
          className=' w-14 h-14'
          resizeMode='contain'
        />
        <Text className='text-white font-psemibold my-2 text-xl'>{username}</Text>
        
      </View>
       <View className=' flex-row justify-center gap-10'>
          <View>
            <Text className='text-white font-psemibold text-2xl text-center'>{post.length}</Text>
            <Text className='text-white font-pextralight my-2 text-center text-lg capitalize'>posts</Text>
          </View>
          <View>
            <Text className='text-white font-psemibold text-2xl text-center'>1.2k</Text>
            <Text className='text-white font-pextralight my-2 text-center text-lg capitalize'>views</Text>
          </View>
       </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})