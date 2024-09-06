import { Animated, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '@/components/HomeViews/Header'
import useCustomFetch from '@/components/Reusables/CustomFetch'
import { getPosts, GetTrendingVideos } from '@/lib/AppWrite'
import AllVideos from '@/components/HomeViews/AllVideos'
import Empty from '@/components/HomeViews/Empty'
import CustomRefresh from '@/components/spinner/CustomRefresh'
import TrendingVideos from '@/components/HomeViews/TrendingVideos'
import SolidRoundSpinner from '@/components/spinner/SolidSpinner'

const Home = () => {
  const {data: post, loading, refresh, error } = useCustomFetch({fn:getPosts})
  const { data: trend} = useCustomFetch({fn:GetTrendingVideos})
  const [ refreshing, setRefreshing ] = useState(false)
  const [scrollY, setScrollY] = useState(0); 
  
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    event.nativeEvent.contentOffset.y <= -150 ? setScrollY(event.nativeEvent.contentOffset.y) : setScrollY(0);
  };
  
  const handleRefresh = () => {
    if (scrollY < -150) {
      setRefreshing(true);
      refresh().finally(() => setRefreshing(false));
    }}

  return (
    <SafeAreaView className='h-full bg-pry_black '>
      <View className='py-7 px-5'>
        <Header />
        {loading ? <SolidRoundSpinner className='border-gold'/> :
        post ?
        <FlatList 
        data={post}
        keyExtractor={(item)=> (item?.prompt)}
        renderItem={({item})=>(
          <AllVideos post={item}/>

        )}
        ListHeaderComponent={()=>(
          <View className=''>
            <TrendingVideos data={trend}/>
          </View>
        )}
        onScroll={handleScroll}
        onMomentumScrollBegin={handleRefresh}
        ListEmptyComponent={()=>(
          <Empty />
        )}
        refreshControl={<CustomRefresh refreshing={refreshing} refreshh={handleRefresh} />}
        /> : null }
     </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})