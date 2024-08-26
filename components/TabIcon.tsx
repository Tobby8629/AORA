import {Text, View, Image } from 'react-native'
import React from 'react'

interface tabicon {
    src: any,
    text: string,
    color: string,
    focused: boolean,
  }

const TabIcon = ({src, text, color, focused}: tabicon ) => (
    <View className=' justify-center items-center gap-2'>
       <Image 
         source={src}
         className='w-[24px] h-[24px]'
         resizeMode= "contain"
         tintColor={color}
       />
       <Text style={{color: focused ? color : "gray"}} className=' font-semibold text-xs font-pregular'>
        {text}
       </Text>
    </View>
  )
export default TabIcon  