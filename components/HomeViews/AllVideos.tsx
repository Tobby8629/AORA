import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons'

interface video {
  post: any
}


const AllVideos = ({post}: video) => {
  const [play, setplay] = useState(true)
  const twentysix = ( text:string) => {
    const gettext = text.slice(0, 27)
    return gettext
  }
 
  return (
    <>
    <View className='px-5 my-5 flex-row justify-between items-start'>
      <View className=' flex-row'>
        <Image 
          source={{ uri:post.creator.avatar}}
          className=' h-[40px] w-[40px] rounded-xl border-[1px] border-gold mr-3'
          resizeMode= "contain"
        />
        <View>
          <Text className='text-white mb-1 font-pregular text-xl'> {post.title.length > 26 ? `${twentysix(post.title)}...` : post.title}</Text>
          <Text className='text-white font-plight font-normal text-sm '>{post.creator.username}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Image 
          source={icons.more}
          className=' w-[25px] h-[25px]'
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
    <View className='mb-8 relative'>
      <Image 
      source={{uri: post?.thumbnail}}
      className=' h-[200px] w-[327px] mx-auto rounded-xl'
      resizeMode= "contain"
      />
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
  </>
  )
}

export default AllVideos