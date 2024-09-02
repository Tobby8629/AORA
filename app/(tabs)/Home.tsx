import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '@/components/HomeViews/Header'

const Home = () => {
  return (
    <SafeAreaView className='h-full bg-pry_black'>
      <ScrollView>
        <View className='h-screen w-[86%] pt-7 mx-auto'>
          <Header />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})