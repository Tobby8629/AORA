import { Image, StyleSheet, Platform, Text, View, ScrollView, SafeAreaView } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
import { Link, Redirect, useRouter } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../constants/images'
import Button from '@/components/Button';
import 'react-native-url-polyfill/auto'
import { useGlobalContext } from '@/context/GlobalProvider';

export default function HomeScreen() {
  const navigate = useRouter()
  const { user, loading, islogged } = useGlobalContext()
  

  if(!loading && islogged ){ return  (<Redirect href="/(tabs)/Home" />)}
  return (
    <SafeAreaView className=' bg-pry_black h-full'>
      <ScrollView>
        <View className=' items-center justify-center min-h-[90vh] px-5'>
          <Image 
            source={images.logo}
            className='h-[34px] w-[118px]'
            resizeMode= "contain"
          />
          <Image
            source={images.cards}
            className='w-[375px] h-[298px]'
            resizeMode= "contain"
        />

         <View className='my-7'>
          <Text className=' text-4xl font-pbold text-white text-center font-semibold'>
            Discover Endless Possibilities with {" "}
            <Text className=' text-gold text-4xl font-pbold font-semibold'>Aora</Text>
            <View className='relative'>
              <Image 
                source={images.path}
                className='w-[55px] h-[14px] absolute -bottom-2 right-0'
                resizeMode='contain'
              />
            </View>
          </Text>
          
         </View>

         <Text className='text-lg  font-pregular font-normal text-center text-white'>Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora</Text>
         
         <Button isloaded={loading} text='Continue with email' handlePress={()=> navigate.push("/(auth)/signIn")}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  
     
  );
}


