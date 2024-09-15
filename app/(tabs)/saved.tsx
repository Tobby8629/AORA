import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import SearchBar from '@/components/SearchBar'
import useCustomFetch from '@/components/Reusables/CustomFetch'
import { DelVideo, getPosts, getSaveVideo, saveVideo } from '@/lib/AppWrite'
import AllVideos from '@/components/HomeViews/AllVideos'
import { useFocusEffect } from 'expo-router'
import Empty from '@/components/HomeViews/Empty'
import SolidRoundSpinner from '@/components/spinner/SolidSpinner'
import { useGlobalContext } from '@/context/GlobalProvider'
import icons from '@/constants/icons'

const saved = () => {
  const {user} = useGlobalContext()
  const { data: post, refresh, loading } = useCustomFetch({ fn: getSaveVideo});
  const [savedpost, setsavedpost] = useState<any[]>([]);
  const [searchvalue, setsearchvalue] = useState("");
  const [id, setid] = useState("");

  const handleDelete = async (id:string) => {
    setid("")
    await DelVideo({video: id, user: user.$id}).then(()=>{
      refresh()
    })
  }
  
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
          refresh(); 
        }
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
    setid("")
  }, [post,searchvalue]));


  return (
    <SafeAreaView className='h-full bg-pry_black'>
      <View className=' p-7'>
        <Text className='text-white font-pmedium mb-8 text-3xl'>Saved Videos</Text>
        <SearchBar handleclick={handleclick}/>
        {loading ? <SolidRoundSpinner  className='border-gold'/> : 
          <FlatList 
            data={savedpost}
            keyExtractor={(item)=>item.$id}
            renderItem={({item}) => <AllVideos post={item} updateID={updateID} id={id}>
              <TouchableOpacity onPress={() =>handleDelete(id)} className='flex-row pb-3 items-center font-pregular text-sm capitalize'>
                <Image
                  source={icons.del}
                  className=" w-3 h-3"
                  resizeMode='contain'
                />
                <Text className='font-pregular text-sm capitalize ml-2 text-white'>Delete</Text>
            </TouchableOpacity>
            </AllVideos>
              
              }
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