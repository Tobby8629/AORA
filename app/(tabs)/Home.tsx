import { Animated, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Header from '@/components/HomeViews/Header'
import useCustomFetch from '@/components/Reusables/CustomFetch'
import { deletePost, getPosts, GetTrendingVideos } from '@/lib/AppWrite'
import AllVideos from '@/components/HomeViews/AllVideos'
import Empty from '@/components/HomeViews/Empty'
import CustomRefresh from '@/components/spinner/CustomRefresh'
import TrendingVideos from '@/components/HomeViews/TrendingVideos'
import SolidRoundSpinner from '@/components/spinner/SolidSpinner'
import { useFocusEffect } from '@react-navigation/native';
import { useGlobalContext } from '@/context/GlobalProvider'
import icons from '@/constants/icons'

const Home = () => {
  const {data: post, loading, refresh, error } = useCustomFetch({fn:getPosts})
  const { data: trend, refresh: trendrefresh} = useCustomFetch({fn:GetTrendingVideos})
  const [ refreshing, setRefreshing ] = useState(false)
  const [scrollY, setScrollY] = useState(0); 
  const {user} = useGlobalContext()
  
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    event.nativeEvent.contentOffset.y <= -150 ? setScrollY(event.nativeEvent.contentOffset.y) : setScrollY(0);
  };


  useFocusEffect(useCallback(()=>{
    const fetchPosts = async () => {
      try {
        const newpost = await getPosts();
        if (newpost.length > post.length || newpost.length < post.length) {
          refresh(); 
          trendrefresh().finally(() => setRefreshing(false));
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  
  },[post]))

  
  const handleRefresh = () => {
    if (scrollY < -150) {
      setRefreshing(true);
      refresh(); trendrefresh().finally(() => setRefreshing(false));
   }}

  const [id, setid] = useState("")

  const updateID = useCallback((id: string) => {
    setid((prevID) => (prevID === id ? "" : id));
  }, []);

  const MemoizedHeader = useMemo(() => (
    <View className=''>
      <TrendingVideos data={trend} />
    </View>
  ), [trend]);

  return (
    <SafeAreaView className='h-full bg-pry_black '>
      <View className='mb-52 p-5'>
        <Header user={user}/>
        {loading ? <SolidRoundSpinner className='border-gold'/> :
        post ?
        <FlatList 
        data={post}
        keyExtractor={(item)=> (item?.prompt)}
        renderItem={({item})=>(
          <AllVideos post={item} updateID={updateID} id={id}>
            <TouchableOpacity className='flex-row pb-3 items-center font-pregular text-sm capitalize'>
                <Image 
                  source={icons.bookmark}
                  className=" w-3 h-3"
                  resizeMode='contain'
                />
                <Text className='font-pregular text-sm capitalize ml-2 text-white'>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity className='flex-row pb-3 items-center font-pregular text-sm capitalize'>
                <Image 
                  source={icons.del}
                  className=" w-3 h-3"
                  resizeMode='contain'
                />
                <Text className='font-pregular text-sm capitalize ml-2 text-white'>delete</Text>
            </TouchableOpacity>
          </AllVideos>
        )}
        ListHeaderComponent={trend.length > 0 ? MemoizedHeader : null}
        onScroll={handleScroll}
        onMomentumScrollBegin={handleRefresh}
        ListEmptyComponent={()=>(
          <Empty firstText='No Videos Found' secondText='No Video Uploaded yet' btnText='Upload a Video' />
        )}
        refreshControl={<CustomRefresh refreshing={refreshing} refreshh={handleRefresh} />}
        showsVerticalScrollIndicator={false}
        /> : null }
      
     </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})