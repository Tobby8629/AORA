import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useCustomFetch from '../Reusables/CustomFetch'
import { GetTrendingVideos } from '@/lib/AppWrite'
import { Image } from 'react-native'
import icons from '@/constants/icons'

interface Eachpost {
  $id: string
  title: string   
  thumbnail: string,
  video: string
}

interface TrendingVideosProps {
    data: Eachpost[];
}

const TrendingVideos = React.memo (({data}: TrendingVideosProps) => {
  const post = data.map((e)=>({
    id: e.$id,
    title: e.title,
    thumbnail: e.thumbnail,
    video: e.video
  }))
  
  return (
    <View>
      <Text className='text-lg font-pregular text-white font-normal'>Trending Videos</Text>
       <FlatList 
        data={post}
        keyExtractor={(post)=> post.id}
        renderItem={({item})=>(
         <TouchableOpacity className='mt-5 px-2 pr-3 relative'>
           <Image
             source={{uri: item.thumbnail}}
             className=' w-[168px] h-[268px] rounded-2xl'
             resizeMode='cover'
           />

           <View className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
            <Image
                source={icons.play}
                className=' h-[40px] w-[40px] rounded-2xl'
                resizeMode='cover'
            />
           </View>
         </TouchableOpacity> 
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
       />
    </View>
  )
})

export default TrendingVideos

const styles = StyleSheet.create({})