import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import AllVideos from '@/components/HomeViews/AllVideos'
import Header from '@/components/profile/Header'
import { useGlobalContext } from '@/context/GlobalProvider'
import useCustomFetch from '@/components/Reusables/CustomFetch'
import { deletePost, getUserVideos, saveVideo } from '@/lib/AppWrite'
import SolidRoundSpinner from '@/components/spinner/SolidSpinner'
import Empty from '@/components/HomeViews/Empty'
import { useFocusEffect } from 'expo-router'
import icons from '@/constants/icons'

const profile = () => {
  const { user } = useGlobalContext()
  const [id, setid] = useState("")
  const updateID = (id: string) => {
    setid((prevID) => (prevID === id ? "" : id))
  }

  const { data: post, loading, refresh } = useCustomFetch({fn: ()=> getUserVideos(user.$id)}) 

  useFocusEffect(useCallback(()=>{
    const fetchPosts = async () => {
      try {
        const newpost = await getUserVideos(user.$id);
        if (newpost.length > post.length || newpost.length < post.length) {
          refresh(user.$id)
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  
  },[post]))

  const deletee = async (id: string) => {
    try {
      updateID("")
      await deletePost(id).then(()=>{
      refresh(user.$id)
      })
    }
    catch(err: any){
      console.log(err.message)
    }
  }

  return (
    <SafeAreaView className=' bg-pry_black h-full'>
      <View className='mb-52 p-5 px-7'>
        <Header post={post} useravatar={user.avatar} username={user.username}/>
        {loading ? <SolidRoundSpinner className='border-gold'/> :
        <FlatList 
        data={post}
        keyExtractor={(item)=> item.$id}
        renderItem={({item})=>(
          <AllVideos post={item} id={id} updateID={updateID}>
            <TouchableOpacity className='flex-row pb-3 items-center font-pregular text-sm capitalize'>
                <Image
                  source={icons.bookmark}
                  className=" w-3 h-3"
                  resizeMode='contain'
                />
                <Text className='font-pregular text-sm capitalize ml-2 text-white'>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>deletee(id)} className='flex-row pb-3 items-center font-pregular text-sm capitalize'>
                <Image 
                  source={icons.del}
                  className=" w-3 h-3"
                  resizeMode='contain'
                />
                <Text className='font-pregular text-sm capitalize ml-2 text-white'>delete</Text>
            </TouchableOpacity>
          </AllVideos>
        )}
        ListEmptyComponent={()=> <Empty firstText='No video found' secondText='No Video found for this profile' btnText=' Back to Explore'/>}
       />
      }
      </View>
    </SafeAreaView>
  )
}

export default profile

const styles = StyleSheet.create({})