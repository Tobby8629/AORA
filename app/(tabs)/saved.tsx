import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import SearchBar from '@/components/SearchBar'
import useCustomFetch from '@/components/Reusables/CustomFetch'
import { getPosts, getSaveVideo, saveVideo } from '@/lib/AppWrite'
import AllVideos from '@/components/HomeViews/AllVideos'
import { useFocusEffect } from 'expo-router'
import Empty from '@/components/HomeViews/Empty'
import SolidRoundSpinner from '@/components/spinner/SolidSpinner'
import { useGlobalContext } from '@/context/GlobalProvider'

const saved = () => {
  const {user} = useGlobalContext()
  const { data: post, refresh, loading } = useCustomFetch({ fn: getSaveVideo});
  const [savedpost, setsavedpost] = useState<any[]>([]);
  const [searchvalue, setsearchvalue] = useState("");
  const [id, setid] = useState("");

  const updateID = (id: string) => {
    setid((prevID) => (prevID === id ? "" : id));
  }

  const handleclick = (value: string) => {
    
    setsearchvalue(value);
  }

  useEffect(() => {
    if (post) {
      setsavedpost(post);
    }
  }, [post]);

  useFocusEffect(useCallback(() => {
    const fetchPosts = async () => {
      try {
        const newpost = await getSaveVideo();
        if (newpost.length > post.length || newpost.length < post.length) {
          refresh(); }
        }
      catch(err:any){
        console.log(err.message)
      }
      finally {
        const getfiltered = post?.filter((e) => e.title.includes(searchvalue));
        setsavedpost(getfiltered);
      }
    }
    fetchPosts()
  }, [searchvalue, post]));


  return (
    <SafeAreaView className='h-full bg-pry_black'>
      <View className=' p-7'>
        <Text className='text-white font-pmedium mb-8 text-3xl'>Saved Videos</Text>
        <SearchBar handleclick={handleclick}/>
        {loading ? <SolidRoundSpinner  className='border-gold'/> : 
          <FlatList 
            data={savedpost}
            keyExtractor={(item)=>item.$id}
            renderItem={({item}) => <AllVideos post={item} updateID={updateID} id={id} />}
            ListEmptyComponent={()=> <Empty firstText={`No Video ${searchvalue} found`} 
            secondText={`Want to Create a Video about ${searchvalue}`}
            btnText= "Create Video"
            />
          }
          showsVerticalScrollIndicator={false}
          />
        }
       
      </View>
    </SafeAreaView>
  )
}

export default saved

const styles = StyleSheet.create({})