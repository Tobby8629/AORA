import { Alert, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import SearchBar from '@/components/SearchBar'
import useCustomFetch from '@/components/Reusables/CustomFetch'
import { SearchVideo } from '@/lib/AppWrite'
import Empty from '@/components/HomeViews/Empty'
import AllVideos from '@/components/HomeViews/AllVideos'
import SolidRoundSpinner from '@/components/spinner/SolidSpinner'


const query = () => {
  const {query} = useLocalSearchParams()
  let search = query.toString()
  const {data: video, refresh, error, loading} = useCustomFetch({fn: () => SearchVideo(query)})
  useEffect(()=>{
    refresh()
  },[query])
  const getpath = usePathname()

  const handleclick =  async (value?: string) => {
    if(value==="") {
      Alert.alert(" No value to query the database")
      return
    }
    else if(getpath.startsWith("/search")) {
      router.setParams({query: value})
   } 
  }

  const [id, setid] = useState("")

    const updateID = (id: string) => {
      setid((prevID) => (prevID === id ? "" : id))
    }

  return (
    <SafeAreaView className=' h-full bg-pry_black'>
      <View className='min-h-screen px-5 py-7'>
        <Text className='text-white font-pregular text-lg'>Search result</Text>
          <Text className='text-white font-psemibold text-3xl font-semibold mt-2'>{query}</Text>
          <SearchBar searchText={search} handleclick={handleclick}  />
          {loading ? <SolidRoundSpinner className='border-gold' /> : video?.length <= 0 ? <Empty 
            firstText="No Videos found"  
            secondText={`No Video of ${query} found in database`} 
            btnText={`upload a video about ${query}`}
            /> : 
            <FlatList 
            data={video}
            keyExtractor={(item)=> item?.$id}
            renderItem={({item})=>(
            <AllVideos post={item} id={id} updateID={updateID}/>
            )}
          />
          }
      </View>
    </SafeAreaView>
    
  )
}

export default query

const styles = StyleSheet.create({})


  