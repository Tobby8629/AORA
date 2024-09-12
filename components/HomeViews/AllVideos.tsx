import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode, useState } from 'react'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { ResizeMode, Video } from 'expo-av'
import { deletePost } from '@/lib/AppWrite'
import { router } from 'expo-router'

interface video {
  post: any
  id: string
  updateID: (id: string) => void
  children?: ReactNode
}


const AllVideos = ({post, updateID, id, children}: video) => {
  const [play, setplay] = useState(true)
  const twentysix = ( text:string) => {
    const gettext = text.slice(0, 27)
    return gettext
  }
 
  return (
    <>
    <View className='px-2 my-5 flex-row justify-between items-start relative'>
      <View className=' flex-row '>
        <Image 
          source={{ uri:post.creator.avatar}}
          className=' h-[40px] w-[40px] rounded-xl border-[1px] border-gold mr-3'
          resizeMode= "contain"
        />
        <View>
          <Text className='text-white mb-1 font-pregular text-xl'>{post.title.length > 26 ? `${twentysix(post.title)}...` : post.title}</Text>
          <Text className='text-white font-plight font-normal text-sm '>{post.creator.username}</Text>
        </View>  
      </View>
      <TouchableOpacity onPress={()=> updateID(post.$id)}>
        <Image 
          source={icons.more}
          className=' w-[25px] h-[25px]'
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>

    <View className='mb-8'>
      {play ? 
        <Image 
        source={{uri: post.thumbnail}}
        className=' h-[200px] w-[327px] mx-auto rounded-xl'
        resizeMode= "cover"
        /> : 
        <View  className=' h-[200px] w-[327px] mx-auto rounded-xl'>
          <Video 
          source={{uri: post.video}}
          useNativeControls
          // onPlaybackStatusUpdate={()=>setplay}
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay
          style={{height: "100%", width:"100%"}}
          />
        </View>
      }
    <TouchableOpacity onPress={()=> setplay(!play)} className=' absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 h-[200px] w-[330px]'>
      {play ? 
        <Image 
          source = {icons.play}
          className=' h-[40px] w-[40px] items-center m-auto'
          resizeMode='contain'
        />
       : null }
    </TouchableOpacity>
    
    </View>
    
    {id == post?.$id ? 
      <View className='absolute px-4 py-3 bg-thick_black w-[100px] top-[50px] right-[10px] h-[64px] rounded-[5px]'>
        {children}
      </View> : null }
  </>
  )
}

export default AllVideos